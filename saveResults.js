const fs = require('fs');

const saveResults = ({ libsCount, libs }) => {
  console.log(libs);
  let result = `${libsCount}\n`;

  libs.forEach((lib) => {
    result += `${lib.id} ${lib.scannedBooks.length}\n`;
    result += `${lib.scannedBooks.join(' ')}\n`
  })

  fs.writeFileSync('./result.txt', result, 'UTF-8');
}

module.exports = saveResults;
