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

  const has = items.length > 0;
  const shipping = has ? SHIPPING : 0;
  const discount = has ? DISCOUNT : 0;

  document.getElementById('cartTitle').textContent =
    `${items.length} item${items.length === 1 ? '' : 's'} in your cart`;
  document.getElementById('sumLabel').textContent = `Items Subtotal (${count})`;
  document.getElementById('sumSubtotal').textContent = fmt(subtotal);
  document.getElementById('sumShipping').textContent = fmt(shipping);
  document.getElementById('sumDiscount').textContent = '- ' + fmt(discount);
  document.getElementById('sumTotal').textContent = fmt(subtotal + shipping - discount);
  document.getElementById('cartEmpty').hidden = has;
  document.getElementById('checkoutBtn').disabled = !has;

  // keep the header cart badge in sync
  const badge = document.querySelector('.cart-count');
  if (badge) badge.textContent = items.length;
}

itemsEl.addEventListener('click', e => {
  const item = e.target.closest('.cart-item');
  if (!item) return;
  const qtyEl = item.querySelector('.cart-qty span');
  const qty = parseInt(qtyEl.textContent, 10);

  if (e.target.closest('.plus'))        qtyEl.textContent = Math.min(qty + 1, 10);
  else if (e.target.closest('.minus'))  qtyEl.textContent = Math.max(qty - 1, 1);
  else if (e.target.closest('.cart-remove')) item.remove();
  else return;

  updateCart();
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  alert('Proceeding to checkout…');
});

updateCart();