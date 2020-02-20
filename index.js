const parser = require('./parser')
const saveResults = require('./saveResults');
const getLibs = require('./getLibs');
const getLibsWithUpdatedBooks = require('./getLibsWithUpdatedBooks');

const FILES = [
  './a_example.txt',
  './b_read_on.txt',
  './c_incunabula.txt',
  './d_tough_choices.txt',
  './e_so_many_books.txt',
  './f_libraries_of_the_world.txt',
];

const parsedFile = parser(FILES[0]);
let allLibs = parsedFile.LIB_DESCRIPTION;
let days = parsedFile.DAYS_AMOUNT;

const libsObject = allLibs.reduce((obj, lib) => {
  obj[lib.id] = {...lib, scannedBooks: [], books: [...lib.books]};

  return obj
}, {});

let currentLibId = null;
let daysToEndScan = -1;

const scannedLibsId = [];
console.log(days)
while (days) {
  console.log(daysToEndScan, 'days to scan lib')
  if (daysToEndScan <= 0 && currentLibId !== null) {
    console.log(currentLibId, 'pushed to lbis');
    scannedLibsId.push(currentLibId);
    currentLibId = null;
  }

  if (currentLibId === null) {
    console.log('entered')
    const libsWithMaxRange = getLibs({ libsDescription: allLibs, days });
    libsWithMaxRange.sort((a, b) => {
      return b.score - a.score
    });
    console.log(libsWithMaxRange, 'libs')
    const currentLib = libsWithMaxRange[0];
    console.log(currentLib, 'lib!!!')
    if (!currentLib) {
      days--
      continue
    }
    currentLibId = currentLib.id;
    daysToEndScan = currentLib.signUpTime;

    allLibs = getLibsWithUpdatedBooks(currentLib.books.slice(0, currentLib.score).map((book) => book.id), allLibs);
    allLibs = allLibs.filter((lib) => {
      return lib.id !== currentLib.id
    })
  }

  scannedLibsId.forEach((iterID) => {
    const lib = libsObject[iterID];
    if (!lib.books.length) {
      return
    }

    lib.scannedBooks = [...lib.scannedBooks, ...lib.books.splice(0, lib.shipPerDay).map((book) => book.id)];
  });



  days--;
  daysToEndScan--;
}

console.log(scannedLibsId);

const result = scannedLibsId.map((libId) => {
  return libsObject[libId]
});

console.log('\n\n\n\n\n\n\n\n--------------------------------------------------------------------------------------')
console.log(result);


saveResults({libsCount: parsedFile.LIB_AMOUNT, libs: result});
