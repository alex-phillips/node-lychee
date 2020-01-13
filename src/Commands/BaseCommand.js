const { Command } = require('node-climax');
const Lychee = require('../Lychee');

module.exports = class BaseCommand extends Command {
  async run(cmd, args) {
    const config = this.getConfig(args);
    this.api = new Lychee(config.server.host, config.server.apiKey);
    await this.api.login(config.server.user, config.server.password);
    return this.exec(cmd, args);
  }

  getConfig(args) {
    const host = args.host || this.config.get('server.host');
    const user = args.username || this.config.get('server.username');
    const password = args.password || this.config.get('server.password');
    const apiKey = args.key || this.config.get('server.apiKey');

    if (!host || !user || !password || !apiKey) {
      console.error(`Provide credentials either via command line options or by editing ${Command.getConfigDirectory()}/${Command.APP_NAME}.conf`);
      process.exit(1);
    }

    return {
      server: {
        host,
        user,
        password,
        apiKey,
      },
    };
  }
};
