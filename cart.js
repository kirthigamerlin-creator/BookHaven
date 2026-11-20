const cartItems = JSON.parse(sessionStorage.getItem('cartDetails') ?? '[]');

const cartContainer = document.getElementById("cartItems");

cartContainer.innerHTML = cartItems.map((item, index) => `
    <article class="cart-item" data-price="${item.price}" data-bookid="${item.id}">
        <div class="cart-cover">
           <img src=${item.image} alt=${item.title}/>
        </div>

        <div class="cart-info">
            <h3>${item.title}</h3>
            <p class="cart-author">${item.author}</p>
            <p class="cart-rating">
                <span class="cart-stars">★★★★★</span>
                ${item.rating} (${item.reviews})
            </p>
            <p class="cart-price">
                <b>₹${item.price}</b>
                <s>₹${item.oldPrice}</s>
            </p>
        </div>

        <div class="cart-qty">
            <button class="minus" aria-label="Decrease quantity">
                <i class="fa-solid fa-minus"></i>
            </button>
            <span>${item.quantity}</span>
            <button class="plus" aria-label="Increase quantity">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>

        <button class="cart-remove">
            <i class="fa-regular fa-trash-can"></i>
            Remove
        </button>
    </article>
`).join("");

cartContainer.insertAdjacentHTML(
  "beforeend", `<div class="cart-empty" id="cartEmpty">
                        <p>Your cart is empty.</p>
                        <a href="./categories.html" class="cart-btn-outline">Browse books</a>
                    </div>`);

/** Add to cart functionality */
const SHIPPING = 50;
const DISCOUNT = 100;

const itemsEl = document.getElementById('cartItems');
const fmt = n => '₹' + n.toLocaleString('en-IN');

function updateCart() {
  const items = [...itemsEl.querySelectorAll('.cart-item')];
  let subtotal = 0, count = 0;

  items.forEach(item => {
    const qty = parseInt(item.querySelector('.cart-qty span').textContent, 10);
    subtotal += Number(item.dataset.price) * qty;
    count += qty;
  });

  const hasItems = items.length > 0;
  const shipping = hasItems ? SHIPPING : 0;
  const discount = hasItems ? DISCOUNT : 0;

  document.getElementById('cartTitle').textContent =
    `${items.length} item${items.length === 1 ? '' : 's'} in your cart`;
  document.getElementById('sumLabel').textContent = `Items Subtotal (${count})`;
  document.getElementById('sumSubtotal').textContent = fmt(subtotal);
  document.getElementById('sumShipping').textContent = fmt(shipping);
  document.getElementById('sumDiscount').textContent = '- ' + fmt(discount);
  document.getElementById('sumTotal').textContent = fmt(subtotal + shipping - discount);
  if (hasItems) {
    document.getElementById('cartEmpty').classList.add('hidden');
  } else {
    document.getElementById('cartEmpty').classList.remove('hidden');
  }
  document.getElementById('checkoutBtn').disabled = !hasItems;

  // keep the header cart badge in sync
  const badge = document.querySelector('.cart-count');
  if (badge) badge.textContent = items.length;
}

itemsEl.addEventListener('click', e => {
  const item = e.target.closest('.cart-item');
  const bookId = item.dataset.bookid;
  const editedBook = cartItems.find(cart => cart.id == bookId);
  if (!item) return;
  const qtyEl = item.querySelector('.cart-qty span');
  const qty = parseInt(qtyEl.textContent, 10);

  if (e.target.closest('.plus')) {
    qtyEl.textContent = Math.min(qty + 1, 10);
    editedBook.quantity = Math.min(qty + 1, 10);
    sessionStorage.setItem('cartDetails', JSON.stringify(cartItems));
  } else if (e.target.closest('.minus')) {
    qtyEl.textContent = Math.max(qty - 1, 1);
    editedBook.quantity = Math.max(qty - 1, 1);
    sessionStorage.setItem('cartDetails', JSON.stringify(cartItems));
  } else if (e.target.closest('.cart-remove')) {
    item.remove();
    const updatedCart = cartItems.filter(
      item => item.id !== editedBook.id
    );
    sessionStorage.setItem('cartDetails', JSON.stringify(updatedCart));
  } else return;

  updateCart();
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  const loggedinUser = sessionStorage.getItem('loggedinUser');
  if (!loggedinUser) {
    document.getElementById("modal").classList.add('show');
    document.getElementById('loginMsgBox').classList.add('hidden');
    document.getElementById('signupMsgBox').classList.add('hidden');
  } else {
    alert('Proceeding to checkout…');
  }
});

updateCart();