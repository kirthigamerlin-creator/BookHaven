const books=[
    //Fiction Books
    {
        title:"The Midnight Library",
        author:"Matt Haig",
        category:"Fiction",
        price: 499,
        rating: 4.8,
        image: "./images/F1.jpg"
     },
    {
        title:"Life Out of Order",
        author:" Audrey Niffenegger",
        category:"Fiction",
        price: 250,
        rating: 4.5,
        image: "./images/f2.jpg"
    },
    {
        title:"One Of My Patients is a Vampie",
        author:" Abigali Moyer",
        category:"Fiction",
        price: 480,
        rating: 4.7,
        image: "./images/f3.jpg"
    },
     {
        title:"It Ends With Us",
        author:" Colleen Hoover",
        category:"Fiction",
        price: 300,
        rating: 4.3,
        image: "./images/f5.jpg"
    },
     //Biography

    {
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        category: "Biography",
        price: 250,
        rating: 4.9,
        image: "./images/b1.jpg"
    },
    {
        title:"Will and Attention",
        author:" Meghan O' Gieblyn",
        category:"Biography",
        price: 400,
        rating: 4.6,
        image: "./images/b2.jpg"
    },
    {
        title:"Hawking: His Life and Work",
        author:" Graham Farmelo",
        category:"Biography",
        price: 450,
        rating: 4.9,
        image: "./images/b3.jpg"
    },
    //Technology books
    {
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        category: "Technology",
        price: 400,
        rating: 4.6,
        image : "./images/t1.jpg"
    },
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Technology",
        price: 550,
        oldPrice: 650,
        rating: 4.8,
        image: "./images/t2.jpg"
    },

    //Children books
    {
        title: "Harry Potter",
        author: "J.K. Rowling",
        category: "Children",
        price: 450,
        rating: 4.9,
        image: "./images/c1.jpg"
    },
    {
        title: "The Jungle Book",
        author: "Rudyard Kipling",
        category: "Children",
        price: 250,
        rating: 4.7,
        image: "./images/c2.jpg"
    },

    //Mystery Section
    {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        category: "Mystery",
        price: 399,
        rating: 4.8,
        image: "./images/m1.jpg"
    },

    //Education books
   {
        title: "Atomic Habits",
        author: "James Clear",
        category: "Education",
        price: 350,
        rating: 4.8,
        image: "./images/e1.jpg"
    },
  
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "Education",
        price: 450,
        rating: 4.9,
        image: "./images/e2.jpg"
    },
    //romance books
     {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Romance",
        price: 299,
        rating: 4.8,
        image: "./images/r1.jpg"
        
    },
    //Thriller books
    {
       title: "Please Enjoy Your Stay",
        author: "Tara Goedgen",
        category: "Thriller",
        price: 299,
        rating: 4.8,
        image: "./images/th1.jpg"  
    }


]


const booksContainer = document.getElementById("books-container");
const categoryCards=document.querySelectorAll(".category-card");
const bookTitle=document.getElementById("book-title");
const bookCount=document.getElementById("book-count");
function displayBooks(bookList)
{
    booksContainer.innerHTML="";
     if(bookList.length === 0){
        bookCount.innerText ="No books are available";
        }
        else{
            bookCount.innerText=`Showing 1-${bookList.length} of ${bookList.length} books`;
        }
    bookList.forEach(function(book){
        booksContainer.innerHTML +=` 
        <div class="books-item">
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p class="Author"> ${book.author}</p>
        <p class="price" >₹${book.price}</p>
        <p class="rating">
                    ⭐⭐⭐⭐⭐ ${book.rating}
        </p>
        <button class="cart-btn"
         onclick="addToCart('${book.title}')">🛒 Add to Cart</button>
        </div>
        `;
    })
   
}



const categoryDetails = (selectedCategory) => {
    const filteredBooks = books.filter(function (book) {
        return book.category === selectedCategory;
    });
    displayBooks(filteredBooks);
    bookTitle.innerText = "Fiction Books";
    bookCount.innerText = "Showing 1-" + filteredBooks.length + " " + filteredBooks.length + "books";
    categoryCards.forEach(function (item) {
        item.classList.remove("active");
    });
    card.classList.add("active");
    document.getElementById("categories").innerText = selectedCategory;
}

categoryCards.forEach(function(card){
    card.addEventListener("click",function(){
        const selectedCategory=card.dataset.category;
        const filteredBooks=books.filter(function(book)
        {
            return book.category === selectedCategory;
        });
            displayBooks(filteredBooks);
            bookTitle.innerText= "Fiction Books";
            bookCount.innerText = "Showing 1-" +filteredBooks.length + " " + filteredBooks.length + "books";
            categoryCards.forEach(function(item){
                item.classList.remove("active");
            });
            card.classList.add("active");
            document.getElementById("categories").innerText =selectedCategory;
        
    });
});


categoryDetails('Fiction');
 


 



