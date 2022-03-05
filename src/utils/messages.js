const { bold, underline } = require('./chalkUtils');

module.exports = {
  openSite(word) {
    return bold('Abrir no site: ') + underline(`https://dicio.com.br/${word}`);
  },
};
