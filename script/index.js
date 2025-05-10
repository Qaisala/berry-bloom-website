// index.js
document.addEventListener("DOMContentLoaded", () => {
  initializeWomenProducts();
  initializeMenProducts();
  updateCartCount(); // Assuming you have this function as well
});

// ...............................//

function updateCartCount() {
  const cartCountSpan = document.getElementById("cart-count");
  const cartItems = localStorage.getItem("cart");
  let cart = cartItems ? JSON.parse(cartItems) : [];
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  if (cartCountSpan) {
    cartCountSpan.textContent = totalQuantity;
  }
}
// ...............................//

function addToCart(id, name, price, imageSmall) {
  const productToAdd = {
    id: parseInt(id),
    name: name,
    price: parseFloat(price),
    imageSmall: imageSmall,
    quantity: 1,
  };

  const cartItems = localStorage.getItem("cart");
  let cart = cartItems ? JSON.parse(cartItems) : [];

  const existingProductIndex = cart.findIndex(
    (item) => item.id === productToAdd.id
  );

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity++;
  } else {
    cart.push(productToAdd);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(`${name} added to cart! Cart:`, cart);

  // Update the cart count on the current page
  updateCartCount();

  // Show the notification
  const notification = document.getElementById("cart-notification");
  const notificationImage = document.getElementById("notification-image");

  // Set the image source
  if (notificationImage) {
    notificationImage.src = imageSmall;
  }

  notification.classList.add("show");

  // Hide the notification after a few seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);

  // Dispatch a custom event to notify other tabs/windows
  window.dispatchEvent(new CustomEvent("fragranceHavenCartUpdated"));
}

// ...............................//
function handleAddToCartClick(buttonElement, id, name, price, imageSmall) {
  buttonElement.classList.add("clicked");
  setTimeout(() => {
    buttonElement.classList.remove("clicked");
  }, 500);
  addToCart(id, name, price, imageSmall);
}
// ...............................//

// Function for displaying Women's Perfume on the page.
function initializeWomenProducts() {
  // Select the Women's Perfume section in the html file
  const productListWomen = document.getElementById("product-women-list");

  // Filter the "products" array to get only Women's Perfume, then iterate over the elements of an array
  products
    .filter((product) => product.id >= 1 && product.id <= 12)
    .forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product-item");

      productDiv.innerHTML = ` 
          <a href="specific.html?productId=${
            product.id
          }" style="text-decoration: none;" id="specific-id">
          <img src="${product.image}">
          <h3>${product.name}</h3>
          <p class="price">JOD ${product.price.toFixed(2)}</p>
          <p class="description">${product.description}</p>
          <div class="product-rating">
          <img src="${product.ratingImg}">
          </div></a> 
    <button class="add-to-cart" onclick="this.classList.add('clicked'); setTimeout(() => this.classList.remove('clicked'), 500); addToCart('${
      product.id
    }', '${product.name}', '${product.price}', '${product.imageSmall}')">
        <span>Add to Cart</span>
        <span class="cart-icon-svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z"/></svg>
        </span>
      </button>
      `;

      productListWomen.appendChild(productDiv);
    });
}

// ...............................//

// Function for displaying Men's Perfume on the page.
function initializeMenProducts() {
  // Select the Men's Perfume section in the html file
  const productListMen = document.getElementById("product-men-list");

  // Filter the "products" array to get only Men's Perfume, then iterate over the elements of an array
  products
    .filter((product) => product.id >= 13 && product.id <= 24)
    .forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product-item");

      productDiv.innerHTML = `
          <a href="specific.html?productId=${product.id}" id="specific-id">
          <img src="${product.image}"></a>
          <h3>${product.name}</h3>
          <p class="price">JOD ${product.price.toFixed(2)}</p>
          <p class="description">${product.description}</p>
          <div class="product-rating">
          <img src="${product.ratingImg}">
          </div>
           <button class="add-to-cart" onclick="this.classList.add('clicked'); setTimeout(() => this.classList.remove('clicked'), 500); addToCart('${
             product.id
           }', '${product.name}', '${product.price}', '${product.imageSmall}')">
        <span>Add to Cart</span>
        <span class="cart-icon-svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z"/></svg>
        </span>
      </button>
      `;

      productListMen.appendChild(productDiv);
    });
}

// the track order section
function trackOrder() {
  const trackingNumberInput = document.getElementById("trackingNumber");
  const trackingNumber = trackingNumberInput.value.trim();

  if (trackingNumber) {
    const orders = localStorage.getItem("orders");
    if (orders) {
      const ordersArray = JSON.parse(orders);
      const foundOrder = ordersArray.find(
        (order) => order.trackingNumber === trackingNumber
      );

      if (foundOrder) {
        window.location.href = `track.html?orderId=${foundOrder.orderId}`;
      } else {
        alert("Tracking number not found.");
      }
    } else {
      alert("No order data found.");
    }
  } else {
    alert("Please enter your tracking number.");
  }
}

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
