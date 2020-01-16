const BaseCommand = require('./BaseCommand');

module.exports = class UploadCommand extends BaseCommand {
  async exec(cmd, args) {
    for (const file of args._.slice(1)) {
      const response = await this.api.upload(file, args.album || 0);
    }
  }
};
