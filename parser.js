const fs = require('fs')

const inputFilePath = 'a_example.txt';

module.exports = (path = inputFilePath) => {
  const data = fs.readFileSync(path, 'utf8').split('\n');
  data.pop()
  const [mainInfo, booksScore, ...libDescription] = data;

  const splitAndMapToInt = (string) => string.split(' ').map(item => parseInt(item, 10));

  const [BOOK_AMOUNT, LIB_AMOUNT, DAYS_AMOUNT] = splitAndMapToInt(mainInfo)
  const BOOKS_SCORE = splitAndMapToInt(booksScore)
  const LIB_DESCRIPTION = libDescription.reduce((acc, curr, index) => {
    if (index % 2 === 0 || acc.length === 0) {
      const [bookCount, signUpTime, shipPerDay ] = splitAndMapToInt(curr)
      acc.push({
        signUpTime,
        shipPerDay,
        books: [],
      })
    } else {
      acc[acc.length - 1].books = splitAndMapToInt(curr)
        .map((book, index) => ({ id: book, score: BOOKS_SCORE[book ]}))
        .sort((a, b) => b.score - a.score)
    }
    return acc;
  }, []);

  return {BOOK_AMOUNT, LIB_AMOUNT, DAYS_AMOUNT, BOOKS_SCORE, LIB_DESCRIPTION}
}

