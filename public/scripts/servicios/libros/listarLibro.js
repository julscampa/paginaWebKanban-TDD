document.addEventListener('DOMContentLoaded', listarLibro);

async function listarLibro() {

//Window.location nos da el URL en el que estamos, utilizo splice para recuperar el ID de un libro específico
  
  let idLibro = window.location.pathname.slice(13);
  console.log(idLibro);

  const url = `/libro/JSON/${idLibro}`;
  console.log(url);
  
  const res = await fetch(url);

  const libro = await res.json();

  console.log(libro);

    const book = document.getElementById('book'); 
    const bookInfo = document.getElementById('book-info'); 

    const link = document.createElement('a');
    const cover = document.createElement('img');    
    const ratingContainer = document.createElement('div');
    const seeThroughRating = document.createElement('div');
    const rating1 = document.createElement('button');
    const rating2 = document.createElement('button');
    const rating3 = document.createElement('button');
    const rating4 = document.createElement('button');
    const rating5 = document.createElement('button');

    const price = document.createElement('span');  
    const addToCart = document.createElement('button');

    const isbn = document.createElement('p');
    const title = document.createElement('p');
    const authorLink = document.createElement('a');
    const author = document.createElement('p');
    const genre = document.createElement('p');
    const editorial = document.createElement('p');
    const description = document.createElement('p');


    link.href = `/libros/views/${libro._id}`;
    const imgSrc = await fetch(libro.imgUrl);
    cover.src = imgSrc.url;

    ratingContainer.className = 'rating-holder';
    seeThroughRating.className = 'c-rating c-rating--big'
    price.className = 'price';    
    addToCart.className = 'buy-btn';
    price.innerHTML = '₡ ' + libro.price; 
    addToCart.innerHTML = 'Agregar al carrito';
    isbn.innerHTML = `ISBN:  ${libro.isbn}`
    title.innerHTML = `Título: ${libro.title}`;
    authorLink.href = `/autor/views/${libro.idAutor}`;
    authorLink.style.color = 'white';
    author.innerHTML = `Autor: ${libro.author}`;
    genre.innerHTML = `Género: ${libro.genre}`;
    editorial.innerHTML = `Editorial: ${libro.editorial}`;
    description.innerHTML = `Descripción: ${libro.description}`;

    link.append(cover);
    seeThroughRating.append(rating1, rating2, rating3, rating4, rating5);
    ratingContainer.append(seeThroughRating);
    book.append(link, ratingContainer, price, addToCart);

    authorLink.append(author); 
    bookInfo.append(isbn, title, authorLink, genre, editorial, description);

  //Permite guardar libros en el carrito 
  let addToCartBtn = document.querySelector('.buy-btn');
  console.log('Este es el botón de agregar al carrito', addToCartBtn);

  let CART = [];

    addToCartBtn.addEventListener('click', () => {
 
        CART.push(libro);
        window.localStorage.setItem('CART', JSON.stringify(CART));
        let carrito = JSON.parse(localStorage['CART']);
        console.log('Este es el array que se guarda en localStorage', carrito);
        console.log(CART);
      
    });

  }

