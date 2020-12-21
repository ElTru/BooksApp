{
  'use strict';

  const select = { //obiekt zawierający selektory
    templateOf: {
      templateBook: '#template-book'
    },
    containerOf: { //wrapper
      booksList: '.books-list',
      filters: '.filters'
    },
    class: {
      favoriteBook: 'favorite'
    }
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  const booksList = document.querySelector(select.containerOf.booksList);
  const favoriteBooks = [];
  const allBooks = [];
  const filters = [];
  const bookListContainer = document.querySelector(select.containerOf.booksList);
  const filterContainer = document.querySelector(select.containerOf.filters);

  function render() {
    for(let book of dataSource.books) {
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      const generatedHTML = templates.templateBook({
        ...book,
        ratingBgc,
        ratingWidth,
      });
      const element = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(element);
      allBooks.push(element);
    }
  }

  function filterBooks() {
    for(let book of dataSource.books) {
      const bookToBeHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHidden = false;

      for(let filterName of filters) {
        if (!book.details[filterName]) {
          shouldBeHidden = true;
          break;
        }
      }

      if (shouldBeHidden) {
        bookToBeHidden.classList.add('hidden');
      } else {
        bookToBeHidden.classList.remove('hidden');
      }

    }
  }

  function determineRatingBgc(rating) {
    let background = '';
    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
    }
    if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    }
    if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    }
    if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }
    return background;
  }

  function initActions() {
    bookListContainer.addEventListener('dblclick', function(event){
      event.preventDefault();
      const clickedElement = event.target.offsetParent;

      if (clickedElement.classList.contains('.book__image')) {
        const id = clickedElement.getAttribute('data-id');
        if (!clickedElement.classList.contains(select.class.favoriteBook)) {
          favoriteBooks.push(id);
          clickedElement.classList.add(select.class.favoriteBook);
        } else {
          favoriteBooks.splice(favoriteBooks.indexOf(id), 1);
          clickedElement.classList.remove(select.class.favoriteBook);
        }
      }
    });

    filterContainer.addEventListener('click', function(event) {
      const clickedElement = event.target;

      if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {
        if (clickedElement.checked) {
          filters.push(clickedElement.value);
          filterBooks();
        } else {
          filters.splice(filters.indexOf(clickedElement.value), 1);
          filterBooks();
        }
      }
    });
  }

  render();
  initActions();
}
