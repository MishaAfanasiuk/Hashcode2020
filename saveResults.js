const fs = require('fs');

const saveResults = ({ libsCount, libs }) => {
  let result = `${libsCount}\n`;

  libs.forEach((lib) => {
    result += `${lib.id} ${lib.books.length}\n`;
    result += `${lib.books.join(' ')}\n`
  })

  fs.writeFileSync('./result.txt', result, 'UTF-8');
}

module.exports = saveResults;
