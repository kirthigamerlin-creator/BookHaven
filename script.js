const books = [
    //Fiction Books
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        category: "Fiction",
        price: 499,
        oldPrice: 550,
        rating: 4.8,
        reviews: "1.2k",
        image: "./images/F1.jpg",
    },
    {
        id: 2,
        title: "Life Out of Order",
        author: " Audrey Niffenegger",
        category: "Fiction",
        price: 250,
        oldPrice: 350,
        rating: 4.5,
        reviews: "98k",
        image: "./images/f2.jpg"
    },
    {
        id: 3,
        title: "One Of My Patients is a Vampie",
        author: " Abigali Moyer",
        category: "Fiction",
        price: 480,
        oldPrice: 550,
        rating: 4.7,
        reviews: "7800",
        image: "./images/f3.jpg"
    },
    {
        id: 4,
        title: "It Ends With Us",
        author: " Colleen Hoover",
        category: "Fiction",
        price: 300,
        oldPrice: 500,
        rating: 4.3,
        reviews: "780",
        image: "./images/f5.jpg"
    },
    //Biography

    {
        id: 5,
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        category: "Biography",
        price: 250,
        oldPrice: 340,
        rating: 4.9,
        reviews: "250",
        image: "./images/b1.jpg"
    },
    {
        id: 6,
        title: "Will and Attention",
        author: " Meghan O' Gieblyn",
        category: "Biography",
        price: 400,
        oldPrice: 480,
        rating: 4.6,
        reviews: "500",
        image: "./images/b2.jpg"
    },
    {
        id: 7,
        title: "Hawking: His Life and Work",
        author: " Graham Farmelo",
        category: "Biography",
        price: 450,
        oldPrice: 550,
        rating: 4.9,
        reviews: "9000",
        image: "./images/b3.jpg"
    },
    //Technology books
    {
        id: 8,
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        category: "Technology",
        price: 400,
        oldPrice: 600,
        rating: 4.6,
        reviews: "1000",
        image: "./images/t1.jpg"
    },
    {
        id: 9,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Technology",
        price: 550,
        oldPrice: 720,
        oldPrice: 650,
        rating: 4.8,
        reviews: "1.5k",
        image: "./images/t2.jpg"
    },

    //Children books
    {
        id: 10,
        title: "Harry Potter",
        author: "J.K. Rowling",
        category: "Children",
        price: 450,
        oldPrice: 499,
        rating: 4.9,
        reviews: "90000",
        image: "./images/c1.jpg"
    },
    {
        id: 11,
        title: "The Jungle Book",
        author: "Rudyard Kipling",
        category: "Children",
        price: 250,
        oldPrice: 399,
        rating: 4.7,
        reviews: "350",
        image: "./images/c2.jpg"
    },

    //Mystery Section
    {
        id: 12,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        category: "Mystery",
        price: 399,
        oldPrice: 550,
        rating: 4.8,
        reviews: "650",
        image: "./images/m1.jpg"
    },

    //Education books
    {
        id: 13,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Education",
        price: 350,
        oldPrice: 500,
        rating: 4.8,
        reviews: "100",
        image: "./images/e1.jpg"
    },

    {
        id: 14,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "Education",
        price: 450,
        oldPrice: 500,
        rating: 4.9,
        reviews: "20",
        image: "./images/e2.jpg"
    },
    //romance books
    {
        id: 15,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Romance",
        price: 299,
        oldPrice: 390,
        rating: 4.8,
        reviews: "987",
        image: "./images/r1.jpg"

    },
    //Thriller books
    {
        id: 16,
        title: "Please Enjoy Your Stay",
        author: "Tara Goedgen",
        category: "Thriller",
        price: 299,
        oldPrice: 450,
        rating: 4.8,
        reviews: "345",
        image: "./images/th1.jpg"
    }


]


const booksContainer = document.getElementById("books-container");
const categoryCards = document.querySelectorAll(".category-card");
const bookTitle = document.getElementById("book-title");
const bookCount = document.getElementById("book-count");

const addToCart = (bookId) => {
    const cartDetailsSess = sessionStorage.getItem('cartDetails');
    if (!cartDetailsSess) {
        const newCart = [];
        const newBook = books.find(book => book.id === bookId);
        if (newBook && newBook.id) {
            newBook.quantity = 1;
        }
        newCart.push(newBook);
        sessionStorage.setItem('cartDetails', JSON.stringify(newCart));
        document.querySelector('.cart-count').textContent = newCart.length;
    } else {
        const cartDetails = JSON.parse(cartDetailsSess);
        const existBook = cartDetails.find(cart => cart.id === bookId);
        if (existBook && existBook?.id) {
            existBook.quantity = existBook.quantity + 1;
            sessionStorage.setItem('cartDetails', JSON.stringify(cartDetails));
        } else {
            const addedBook = books.find(book => book.id === bookId);
            if (addedBook && addedBook?.id) {
                addedBook.quantity = 1;
            }
            cartDetails.push(addedBook);
            sessionStorage.setItem('cartDetails', JSON.stringify(cartDetails));
            document.querySelector('.cart-count').textContent = cartDetails.length;
        }
    }
}

function displayBooks(bookList) {
    booksContainer.innerHTML = "";
    if (bookList.length === 0) {
        bookCount.innerText = "No books are available";
    }
    else {
        bookCount.innerText = `Showing 1-${bookList.length} of ${bookList.length} books`;
    }
    bookList.forEach(function (book) {
        booksContainer.innerHTML += ` 
        <div class="books-item">
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p class="Author"> ${book.author}</p>
        <p class="price" >₹${book.price}</p>
        <p class="rating">
                    ⭐⭐⭐⭐⭐ ${book.rating}
        </p>
        <button class="cart-btn"
         onclick="addToCart(${book.id})">🛒 Add to Cart</button>
        </div>
        `;
    })

}



const categoryDetails = (selectedCategory) => {
    const filteredBooks = books.filter(function (book) {
        return book.category === selectedCategory;
    });
    displayBooks(filteredBooks);
    bookTitle.innerText = selectedCategory + " Books";
    bookCount.innerText = "Showing 1-" + filteredBooks.length + " " + filteredBooks.length + "books";
    categoryCards.forEach(function (item) {
        item.classList.remove("active");
    });
    document.getElementById("categories").innerText = selectedCategory;
}

categoryCards.forEach(function (card) {
    card.addEventListener("click", function () {
        const selectedCategory = card.dataset.category;
        const filteredBooks = books.filter(function (book) {
            return book.category === selectedCategory;
        });
        displayBooks(filteredBooks);
        bookTitle.innerText = selectedCategory + " Books";
        bookCount.innerText = "Showing 1-" + filteredBooks.length + " " + filteredBooks.length + "books";
        categoryCards.forEach(function (item) {
            item.classList.remove("active");
        });
        card.classList.add("active");
        document.getElementById("categories").innerText = selectedCategory;

    });
});


categoryDetails('Fiction');







