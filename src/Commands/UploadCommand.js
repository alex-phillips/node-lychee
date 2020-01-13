const BaseCommand = require('./BaseCommand');

module.exports = class UploadCommand extends BaseCommand {
  async exec(cmd, args) {
    for (const file of args.files) {
      const response = await this.api.upload(file, args.album || 0);
    }
  }
};
