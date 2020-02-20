module.exports = (bookIndexesToDelete, libs) => libs.map((lib) => {
  const newBooks = lib.books.filter(book => !bookIndexesToDelete.some(index => book.id === index))
  return { ...lib, books: newBooks };
})
