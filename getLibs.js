const getLibs = ({ libsDescription, days }) => {
  const res = [];
  libsDescription.forEach((lib) => {
    const booksShipAvailable = (days - lib.signUpTime) * lib.shipPerDay;
    const score = lib.books.slice(0, booksShipAvailable).reduce((acc, i) => (acc += i.score, acc), 0);

    res.push({...lib, score})
  });

  return res
}

module.exports = getLibs;
