#!/usr/bin/env node

/**
 * dicio
 * CLI para o dicio.com.br
 *
 * @author Thiago Nelsi do Couto <->
 */

const fs = require('fs');
const init = require('./utils/init');
const cli = require('./utils/cli');
const { openSite } = require('./utils/messages');

const { input } = cli;
const { flags } = cli;
const { clear } = flags;

(async () => {
  init({ clear });

  if (input.includes('help') || flags.help || !input.length) {
    cli.showHelp(0);
    return;
  }

  let promises;
  const options = [];
  const handlers = {};

  promises = fs.readdirSync(`${__dirname}/handlers`).map(async (file) => {
    if (file.endsWith('.js')) {
      const fileName = file.replace('.js', '');
      options.push(fileName);
      handlers[fileName] = (await import(`./handlers/${fileName}.js`)).default;
    }
  });

  await Promise.all(promises);

  const word = input.join(' ');
  const activeFlags = Object.keys(flags)
    .filter((flag) => flags[flag] && options.includes(flag));

  if (flags.apenas) {
    const only = activeFlags[activeFlags.indexOf('apenas') + 1];
    await handlers[only](word);
  } else {
    promises = activeFlags.map(async (flag) => {
      await handlers[flag]?.(word);
    });

    await Promise.all(promises);
  }
  console.log(`\n\t${openSite(word)}\n`);
})();
