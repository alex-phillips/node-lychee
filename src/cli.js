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

// const { argv } = yargs
//   .command('upload [files...]', 'Upload files', yargs => {
//     yargs.option('album');
//   }, async args => {
//     const cmd = new UploadCommand(await getConfig(args));
//     await cmd.run(args);
//   })
//   .command('albums:list', 'List all albums', yargs => {

//   }, async args => {
//     const cmd = new AlbumsCommand(await getConfig(args));
//     await cmd.run(args);
//   })
//   .command('albums:create [name]', 'Create a new album', yargs => {
//     yargs.option('album', {
//       alias: 'a',
//       type: 'string',
//       description: 'ID of the parent album',
//     });
//   }, async args => {
//     const cmd = new AlbumsCommand(await getConfig(args));
//     await cmd.run(args);
//   })
//   .option('host', {
//     alias: 'h',
//     type: 'string',
//     description: 'Server host',
//   })
//   .option('username', {
//     alias: 'u',
//     type: 'string',
//     description: 'Username',
//   })
//   .option('password', {
//     alias: 'p',
//     type: 'string',
//     description: 'Password',
//   })
//   .option('key', {
//     alias: 'k',
//     type: 'string',
//     description: 'API key',
//   })
//   .option('verbose', {
//     alias: 'v',
//     type: 'boolean',
//     description: 'Verbose logging',
//   });

// if (argv._.length === 0) {
//   yargs.showHelp();
// }
