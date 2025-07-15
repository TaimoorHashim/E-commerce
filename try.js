const swiper = new Swiper(".mySwiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: { el: ".swiper-pagination", clickable: true },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});
const products = [
  {
    name: "Oud Intense",
    price: 55,
    img: "https://images.unsplash.com/photo-1586864385815-bd0cd85e8c74",
    badge: "Best Seller",
  },
  {
    name: "Amber Bloom",
    price: 40,
    img: "https://images.unsplash.com/photo-1586864483073-3228652f3b1b",
    badge: "20% Off",
  },
  {
    name: "Floral Luxe",
    price: 60,
    img: "https://images.unsplash.com/photo-1579722822377-56c6f6fcf7a4",
    badge: "Top Rated",
  },
];
// --------------------
// Function: Add to Cart
// --------------------
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSpan = document.getElementById("cart-count");
  if (cartSpan) cartSpan.textContent = count;
}

// ------------------------------
// Optional: Display Products Dynamically
// ------------------------------
function displayProducts() {
  const products = [
    {
      name: "Oud Intense",
      price: 55,
      img: "https://images.unsplash.com/photo-1586864385815-bd0cd85e8c74",
      badge: "Best Seller",
    },
    {
      name: "Amber Bloom",
      price: 40,
      img: "https://images.unsplash.com/photo-1586864483073-3228652f3b1b",
      badge: "20% Off",
    },
    {
      name: "Floral Luxe",
      price: 60,
      img: "https://images.unsplash.com/photo-1579722822377-56c6f6fcf7a4",
      badge: "Top Rated",
    },
  ];

  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = "";
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
        <span class="badge">${p.badge}</span>
        <img src="${p.img}" alt="${p.name}" />
        <div class="product-details">
          <h3>${p.name}</h3>
          <p><strong>$${p.price}</strong></p>
          <a href="#" class="add-btn" onclick="addToCart('${p.name}', ${p.price})">Add to Cart</a>
        </div>
      `;
    grid.appendChild(card);
  });
}

// ----------------------------
// Call Functions on Page Load
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Only call if product grid exists
  if (document.getElementById("product-grid")) {
    displayProducts();
    updateCartCount();
  }
});
