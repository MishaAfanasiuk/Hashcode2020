const parser = require('./parser')
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

const a = parser(FILES[0]);
const g = getLibs({ libsDescription: a.LIB_DESCRIPTION, days: a.DAYS_AMOUNT });
console.log(JSON.stringify(getLibsWithUpdatedBooks([0, 1, 3], a.LIB_DESCRIPTION), null, 2, 2))
