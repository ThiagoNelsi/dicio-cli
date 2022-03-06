const axios = require('axios').default;
const chalk = require('chalk');
const { wordStyle, underline, red } = require('../utils/chalkUtils');

async function significado(word) {
  try {
    const { data } = await axios.get(`https://significado.herokuapp.com/${word}`);

    console.log('\t------------------------------\n');

    console.log(`\tSignificados de ${wordStyle(word.toUpperCase())}:\n`);

    data.forEach((wordClass) => {
      console.log(`\t${underline.bold(wordClass.class.toUpperCase())}`);
      if (wordClass.etymology) {
        console.log(`\t${wordClass.etymology}\n`);
      }
      wordClass.meanings.forEach((meaning) => {
        console.log(`${chalk.cyan('\t\t*')} ${meaning}`);
      });
      console.log('\n\t------------------------------');
    });
  } catch (err) {
    console.log(red(`\tSignificado de ${word} não encontrado.`));
  }
}

module.exports = significado;
