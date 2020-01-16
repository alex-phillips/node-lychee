const { App } = require('node-climax');

(new App('lychee'))
  .init({
    'upload': {
      usage: '[files...]',
      desc: 'Upload files',
      options: {
        album: {
          alias: 'a',
          type: 'string',
          description: 'Upload to specific album',
        },
      },
      file: `${__dirname}/Commands/UploadCommand.js`,
    },
    'albums:list': {
      usage: '',
      desc: 'List all albums',
      options: {},
      file: `${__dirname}/Commands/AlbumsCommand.js`,
    },
    'albums:create': {
      usage: '',
      desc: 'Create a new album',
      options: {
        album: {
          alias: 'a',
          type: 'string',
          description: 'Upload to specific album',
        },
      },
      file: `${__dirname}/Commands/AlbumsCommand.js`,
    },
  }, {
    'server.host': {
      type: 'string',
      default: '',
    },
    'server.username': {
      type: 'string',
      default: '',
    },
    'server.password': {
      type: 'string',
      default: '',
    },
    'server.apiKey': {
      type: 'string',
      default: '',
    },
  }, {
    host: {
      type: 'string',
    },
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    key: {
      type: 'string',
    },
  })
  .run();
