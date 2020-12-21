{
  'use strict';

  const select = { //obiekt zawierający selektory
    templateOf: {
      templateBook: '#template-book'
    },
    containerOf: {
      booksList: '.books-list'
    },
    class: {
      favoriteBook: 'favorite',
    },
    book: {
      bookImage: ''
    }
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  const booksList = document.querySelector(select.containerOf.booksList);
  const allBooks = [];
  const favoriteBooks = [];

  function render() {
    for(let book of dataSource.books) {
      const generatedHTML = templates.templateBook(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(element);
      allBooks.push(element);
    }
  }

  function initActions() {
    for (let book of allBooks) {
      const bookCover = book.querySelector('.book__image');
      console.log(bookCover);

      bookCover.addEventListener('dblclick', function(event){
        event.preventDefault();
        const id = book.getAttribute('.data-id');

        if(!bookCover.classList.contains(select.class.favoriteBook)){
          favoriteBooks.push(id);
          bookCover.classList.add(select.class.favoriteBook);
        } else { 
          favoriteBooks.splice(favoriteBooks.indexOf(id));
          bookCover.classList.remove(select.class.favoriteBook);
        }

      });
    }
  }

  render();
  initActions();
}
