{
  'use strict';

  const select = { //obiekt zawierający selektory
    templateOf: {
      templateBook: '#template-book'
    },
    containerOf: {
      booksList: '.books-list'
    }
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  const booksList = document.querySelector(select.containerOf.booksList);
  const allBooks = [];

  function render() {
    for(let book of dataSource.books) {
      const generatedHTML = templates.templateBook(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(element);
      allBooks.push(element);
    }
  };
  render();

}
