const fs = require('fs');
const got = require('got');
const FormData = require('form-data');
const { CookieJar } = require('tough-cookie');
const { Limiter } = require('./utilities');

module.exports = class Lychee {
  constructor(host, apiKey) {
    this.host = host;

    const cookieJar = new CookieJar();
    this.client = got.extend({
      cookieJar,
      headers: {
        Authorization: apiKey,
      },
    });
  }

  async upload(file, albumId = 0) {
    if (fs.statSync(file).isDirectory()) {
      return this.iterateDirectory(file, albumId);
    }

    console.log(`Uploading ${file}`);
    return this.post('Photo::add', {
      albumID: albumId,
      '0': fs.createReadStream(file),
    });
  }

  async login(user, password) {
    return this.post('Session::login', {
      user,
      password,
    });
  }

  async post(func, data = {}) {
    const form = new FormData();

    form.append('function', func);
    Object.entries(data).forEach(pair => {
      const [key, value] = pair;
      form.append(key, value);
    });

    return (await this.client.post(this.getEndpoint(func), {
      body: form,
    })).body;
  }

  async createAlbum(title, parentId = 0) {
    return this.post('Album::add', {
      title,
      parent_id: parentId,
    });
  }

  async getAlbums() {
    return JSON.parse(await this.post('Albums::get'));
  }

  getEndpoint(action) {
    return `${this.host}/api/${action}`;
  }

  async iterateDirectory(dirpath, albumId) {
    const list = fs.readdirSync(dirpath);

    const files = [];
    const folders = [];

    list.forEach(item => {
      item = `${dirpath}/${item}`;
      const stat = fs.statSync(item);
      if (stat.isDirectory()) {
        folders.push(item);
      } else {
        files.push(item);
      }
    });

    // Process files concurrently
    await Limiter(10, files.map(file => () => this.upload(file, albumId)));

    // Process remaining folders sequentially
    await folders.reduce((previous, folder) => previous.then(() => this.iterateDirectory(folder, albumId)), Promise.resolve());
  }

  walk(dir, results) {
    results = results || [];

    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.resolve(dir, file);
      const stat = fs.statSync(file);
      if (stat.isDirectory()) {
        results = results.concat(this.walk(file));
      } else {
        results.push(file);
      }
    });

    return results;
  }
};
