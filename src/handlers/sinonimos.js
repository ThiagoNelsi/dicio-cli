const { default: axios } = require('axios');
const { wordStyle, cyan, red } = require('../utils/chalkUtils');

async function sinonimos(word) {
  try {
    const { data } = await axios.get(`https://significado.herokuapp.com/synonyms/${word}`);

    console.log('\t------------------------------\n');

    console.log(`\tSinônimos de ${wordStyle(word.toUpperCase())}:\n`);

    data.forEach((synonym) => {
      console.log(`\t${cyan('*')} ${synonym}`);
    });
    console.log('\n\t------------------------------');
  } catch (error) {
    console.log(red(`\tSinônimos de ${word} não encontrado.`));
  }
}

module.exports = sinonimos;
