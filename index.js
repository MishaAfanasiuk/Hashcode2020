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
while (days) {
  if (daysToEndScan <= 0 && currentLibId !== null) {
    scannedLibsId.push(currentLibId);
    currentLibId = null;
  }

  if (currentLibId === null) {
    const libsWithMaxRange = getLibs({ libsDescription: allLibs, days });
    libsWithMaxRange.sort((a, b) => {
      return b.score - a.score
    });
    const currentLib = libsWithMaxRange[0];
    if (currentLib) {
      currentLibId = currentLib.id;
      daysToEndScan = currentLib.signUpTime;
      // console.log(JSON.stringify(allLibs, null, 2));
      console.log(currentLib.books.slice(0, currentLib.booksReadCount));
      allLibs = getLibsWithUpdatedBooks(currentLib.books.slice(0, currentLib.booksReadCount).map((book) => book.id), allLibs, currentLibId);
      allLibs = allLibs.filter((lib) => {
        libsObject[lib.id].books = lib.books;
        return lib.id !== currentLib.id && lib.signUpTime < days
      });
    }
  }

  scannedLibsId.forEach((iterID) => {
    const lib = libsObject[iterID];
    if (!lib.books.length) {
      return
    }
    // console.log(lib.books);
    lib.scannedBooks = [...lib.scannedBooks, ...lib.books.splice(0, lib.shipPerDay).map((book) => book.id)];
  });



  days--;
  daysToEndScan--;
}

const result = scannedLibsId.map((libId) => {
  return libsObject[libId]
});

saveResults({libsCount: result.length, libs: result});
