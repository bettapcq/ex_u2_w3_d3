const URL = 'https://striveschool-api.herokuapp.com/books';

const getBooks = () => {
  fetch(URL)
    .then((res) => {
      if (res.ok === true) {
        return res.json();
      } else {
        throw new Error('response error!');
      }
    })
    .then((booksList) => {
      console.log('bookslist', booksList);
      //   const booksArray = JSON.parse(booksList); => questo non serve perchè viene già convertito con 'return.res.json()'
      booksList.forEach((book) => {
        const booksSection = document.getElementById('books-section');
        booksSection.innerHTML += `
            <div id="card-col-${book.asin}" class="col">
                <div class="card">
                    <img src="${book.img}" class="card-img-top" alt="book-preview">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Price: ${book.price} $</p>
                        <a href="#" onclick="toDiscard(event)" class="btn btn-warning">DISCARD</a>
                        <a href="#" onclick="toBuy(event)" class="btn btn-primary">BUY NOW</a>
                    </div>
                </div>
            </div>
            `;
      });
    })

    .catch((err) => {
      console.log('error', err);
    });
};

getBooks();

const discardBtn = document.getElementById('discard');

// bottone discard
const toDiscard = (e) => {
  const bookToRemove = e.target.closest('.col');
  bookToRemove.classList.add('d-none');
};

const myCart = [];
const cartList = document.getElementById('cart-list');
const endList = document.getElementById('end-list');

// bottone buy
const toBuy = (e) => {
  const bookToBuy = e.target.closest('.card');
  const title = bookToBuy.querySelector('.card-title').innerText;
  const price = bookToBuy.querySelector('.card-text').innerText;

  const newLi = document.createElement('li');
  newLi.innerHTML = `
         <a class="dropdown-item" href="#">${title}</br>${price}</a>
         <button type="button" class="btn btn-danger text-end"><i class="bi bi-trash"></i></button>
  `;
  cartList.insertBefore(newLi, endList);
};

// bottone cestino cart
const deleteFromCart = (e) => {
  const bookToDelete = e.target.closest('li');
  bookToDelete.remove();
};
