const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
  significado: {
    type: 'boolean',
    desc: 'Retorna o significado da palavra',
    alias: 'S',
    default: true,
  },
  clear: {
    type: 'boolean',
    default: false,
    alias: 'c',
    desc: 'Clear the console',
  },
  version: {
    type: 'boolean',
    alias: 'v',
    desc: 'Print CLI version',
  },
  help: {
    type: 'boolean',
    alias: 'h',
    desc: 'Print help',
  },
};

const commands = {
  help: { desc: 'Print help info' },
};

const helpText = meowHelp({
  name: 'dicio',
  flags,
  commands,
}).replace('<command>', '<palavra>');

const options = {
  inferType: true,
  description: false,
  hardRejection: false,
  flags,
};

module.exports = meow(helpText, options);
