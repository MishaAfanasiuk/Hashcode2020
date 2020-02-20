const a = parser(FILES[0]);
const g = getLibs({ libsDescription: a.LIB_DESCRIPTION, days: a.DAYS_AMOUNT });
let days = a.DAYS_AMOUNT;

const libsObject = g.reduce((obj, lib) => {
  obj[lib.id] = {...lib, scannedBooks: [], books: [...lib.books]};

  return obj
}, {});

let libsIds = [];

g.sort((a, b) => {
  return b.score - a.score
})

libs.push(g[0].id);

getLib = (libs, id) => {
  libs.find((lib) => lib.id === id)
};

const lib = getLib(g, libsIds[libsIds.length - 1]);

let currentLibId = null;
let daysToEndScan = -1;

const scannedLibs = [];

// let currentLib = 0;;
//
//
while (days) {
  if (daysToEndScan === 0) {
    scannedLibs.push(currentLibId);
    currentLibId = null;
  }

  if (currentLibId !== null) {
    const libsWithMaxRange = getLibs({ libsDescription: a.LIB_DESCRIPTION, days });
    libsWithMaxRange.sort((a, b) => {
      return b.score - a.score
    });
    const currentLib = libsWithMaxRange[0];
    currentLibId = currentLib.id;
    daysToEndScan = currentLibId.signUpTime;
  }

  scannedLibs.forEach((libIter) => {
    const lib = libsObject[libIter.id];
    if (!lib.books.length) {
      return
    }

    lib.scannedBooks = [...lib.scannedBooks, lib.books.splice(0, lib.shipPerDay)];
  });



  days--
}
