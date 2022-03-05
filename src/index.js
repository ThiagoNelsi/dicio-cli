#!/usr/bin/env node

/**
 * dicio
 * CLI para o dicio.com.br
 *
 * @author Thiago Nelsi do Couto <->
 */

const init = require('./utils/init');
const cli = require('./utils/cli');

const { input } = cli;
const { flags } = cli;
const { clear } = flags;

const options = ['significado'];

const handlers = {
  significado: require('./handlers/significado'),
};

(async () => {
  init({ clear });

  if (input.includes('help') || flags.help || !input.length) {
    cli.showHelp(0);
    return;
  }

  const word = input.join(' ');
  const activeFlags = Object.keys(flags)
    .filter((flag) => flags[flag] && options.includes(flag));

  if (flags.apenas) {
    const only = activeFlags[activeFlags.indexOf('apenas') + 1];
    await handlers[only](word);
  } else {
    activeFlags.forEach((flag) => {
      handlers[flag]?.(word);
    });
  }
})();
