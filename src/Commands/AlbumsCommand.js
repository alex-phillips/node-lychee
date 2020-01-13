const BaseCommand = require('./BaseCommand');

module.exports = class UploadCommand extends BaseCommand {
  async exec(cmd, args) {
    switch (args._[0]) {
      case 'albums:list':
        const albums = await this.api.getAlbums();
        for (const album of albums.albums) {
          this.listAlbum(album);
        }
        break;

      case 'albums:create':
        const newAlbumId = await this.api.createAlbum(args._[1], args.album);
        console.log(`Created album with ID ${newAlbumId}`);
        break;
    }
  }

  listAlbum(album, prefix = '') {
    console.log(`${album.id} - ${prefix}${album.title}`);
    if (album.albums) {
      for (const child of album.albums) {
        this.listAlbum(child, `${prefix}${album.title} - `);
      }
    }
  }
};
