module.exports = (bookIndexesToDelete, libs, crID) => libs.map((lib) => {
  if (crID === lib.id) return lib;
  const newBooks = lib.books.filter(book => !bookIndexesToDelete.some(index => book.id === index));
  return { ...lib, books: newBooks };
})
