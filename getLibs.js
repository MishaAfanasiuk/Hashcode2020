const getLibs = (dataArray, days) => {
  const res = [];
  dataArray.forEach((lib) => {
    const booksShipAvailable = (days - lib.signUpTime) * lib.shipPerDay;
    const score = lib.books.slice(0, booksShipAvailable).reduce((acc, i) => (acc += i, acc), 0);

    res.push({...lib, score})
  });
}
