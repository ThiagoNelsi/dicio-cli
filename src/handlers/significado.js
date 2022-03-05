const axios = require('axios').default;
const chalk = require('chalk');

const wordStyle = chalk.hex('#36BB09').bold;
const { underline } = chalk;

async function significado(word) {
  try {
    const { data } = await axios.get(`https://significado.herokuapp.com/${word}`);

    console.log(`\tSignificados de ${wordStyle(word.toUpperCase())}:\n`);

    data.forEach((wordClass) => {
      console.log(`\t${underline.bold(wordClass.class.toUpperCase())}`);
      if (wordClass.etymology) {
        console.log(`\t${wordClass.etymology}\n`);
      }
      wordClass.meanings.forEach((meaning) => {
        console.log(`${chalk.cyan('\t\t*')} ${meaning}`);
      });
      console.log();
    });

    const link = chalk.bold('Abrir no site: ') + chalk.underline(`https://dicio.com.br/${word}`);
    console.log(`\n\t${link}\n`);
  } catch (err) {
    console.log(chalk.red(`Significado de ${word} não encontrado.`));
  }
}

module.exports = significado;
