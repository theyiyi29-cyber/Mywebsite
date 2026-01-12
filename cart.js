// cart.js — WORKS ON ALL PAGES

function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
}

// Update navbar count (SAFE)
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return;

  const cart = getCart();
  cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

// Open cart modal (SAFE)
function openCart() {
  renderCart();
  const modal = document.getElementById("cartModal");
  if (modal) modal.style.display = "flex";
}

function closeCart() {
  const modal = document.getElementById("cartModal");
  if (modal) modal.style.display = "none";
}

// Render cart items
function renderCart() {
  const itemsEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");

  if (!itemsEl || !totalEl) return;

  const cart = getCart();
  itemsEl.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    itemsEl.innerHTML += `
      <li>
        ${item.name} x${item.quantity}
        <span>₱${item.price * item.quantity}</span>
      </li>
    `;
  });

  totalEl.textContent = total;
}

// Attach cart icon click SAFELY
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const cartIcon = document.getElementById("cartIcon");
  if (cartIcon) {
    cartIcon.addEventListener("click", e => {
      e.preventDefault();
      openCart();
    });
  }
});
