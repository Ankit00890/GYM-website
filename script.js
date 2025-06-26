
     // Cart functionality
     let cart = JSON.parse(localStorage.getItem('fitfabCart')) || [];

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateStorage();
  renderCart();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateStorage();
  renderCart();
}

function updateQuantity(name, newQuantity) {
  const item = cart.find(item => item.name === name);
  if (item) {
    item.quantity = Math.max(1, newQuantity);
    updateStorage();
    renderCart();
  }
}

function updateStorage() {
  localStorage.setItem('fitfabCart', JSON.stringify(cart));
  document.querySelector('.cart-count').textContent = cart.length;
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');
  let total = 0;
  
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <h4>${item.name}</h4>
        <p>₹${item.price} x ${item.quantity}</p>
      </div>
      <div class="cart-item-controls">
        <button onclick="updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
        ${item.quantity}
        <button onclick="updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
        <button onclick="removeFromCart('${item.name}')">×</button>
      </div>
    </div>
  `).join('');

  total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalElement.textContent = total;
}

function toggleCart() {
  document.getElementById('cart').classList.toggle('open');
}

function handlePayment(event) {
  event.preventDefault();
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  // Basic validation
  const form = event.target;
  if (!form.checkValidity()) {
    alert('Please fill all payment details');
    return;
  }

  // Process payment here (this is just a demo)
  alert(`Payment successful for ₹${document.getElementById('total').textContent}!`);
  cart = [];
  updateStorage();
  renderCart();
  toggleCart();
}

// Initialize cart on load
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  document.querySelector('.cart-count').textContent = cart.length;
});
