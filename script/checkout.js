// checkout.js //
document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();

  const clearCartButton = document.getElementById("clear-cart-btn");
  if (clearCartButton) {
    clearCartButton.addEventListener("click", clearCart);
  }

  // Initial validation when the page loads (in case of autofilled values)
  validateCheckoutFields();

  const proceedCheckoutButton = document.getElementById("proceed-checkout-btn");
  if (proceedCheckoutButton) {
    proceedCheckoutButton.addEventListener("click", checkout); // Call checkout on button click
  }
});

function loadFromStorage() {
  const cartItems = localStorage.getItem("cart");
  const orderItemsContainer = document.getElementById("orderItems");
  const cartItemsTestContainer = document.getElementById("cart-items");
  let subtotal = 0;

  if (orderItemsContainer) {
    orderItemsContainer.innerHTML = "";
  }
  if (cartItemsTestContainer) {
    cartItemsTestContainer.innerHTML = "";
  }

  if (cartItems) {
    const cart = JSON.parse(cartItems);

    if (cart.length > 0) {
      cart.forEach((item) => {
        const orderItemDiv = document.createElement("div");
        orderItemDiv.classList.add("order-item");

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("item-details");

        const image = document.createElement("img");
        image.src = item.imageSmall;
        image.alt = item.name;
        image.classList.add("item-image");

        const name = document.createElement("h4");
        name.textContent = item.name;

        const quantityDiv = document.createElement("div");
        quantityDiv.classList.add("quantity-controls");

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.classList.add("quantity-button");
        decreaseButton.classList.add("decrease-button");
        decreaseButton.dataset.productId = item.id;
        decreaseButton.addEventListener("click", decreaseQuantity);

        const quantitySpan = document.createElement("span");
        quantitySpan.textContent = item.quantity;
        quantitySpan.classList.add("item-quantity");
        quantitySpan.dataset.productId = item.id;

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.classList.add("quantity-button");
        increaseButton.classList.add("increase-button");
        increaseButton.dataset.productId = item.id;
        increaseButton.addEventListener("click", increaseQuantity);

        const price = document.createElement("div");
        price.textContent = `JOD ${(item.price * item.quantity).toFixed(2)}`;
        price.classList.add("item-price");
        price.dataset.productId = item.id;

        detailsDiv.appendChild(image);
        detailsDiv.appendChild(name);

        quantityDiv.appendChild(decreaseButton);
        quantityDiv.appendChild(quantitySpan);
        quantityDiv.appendChild(increaseButton);

        orderItemDiv.appendChild(detailsDiv);
        orderItemDiv.appendChild(quantityDiv);
        orderItemDiv.appendChild(price);

        if (orderItemsContainer) {
          orderItemsContainer.appendChild(orderItemDiv);
        }
        subtotal += item.price * item.quantity;
      });

      updateSummary(subtotal);
    } else {
      displayEmptyCartMessage(orderItemsContainer, cartItemsTestContainer);
      updateSummary(0);
    }
  } else {
    displayEmptyCartMessage(orderItemsContainer, cartItemsTestContainer);
    updateSummary(0);
  }
}

function updateSummary(subtotal) {
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");
  const shippingCost = 3.0;

  if (subtotalElement) {
    subtotalElement.textContent = `JOD ${subtotal.toFixed(2)}`;
  }
  if (document.getElementById("shipping")) {
    document.getElementById("shipping").textContent = `JOD ${
      subtotal > 0 ? shippingCost.toFixed(2) : "0.00"
    }`;
  }
  if (totalElement) {
    document.getElementById("total").textContent = `JOD ${(subtotal > 0
      ? subtotal + shippingCost
      : 0
    ).toFixed(2)}`;
  }
}

function displayEmptyCartMessage(orderItemsContainer, cartItemsTestContainer) {
  if (orderItemsContainer) {
    orderItemsContainer.textContent = "Your cart is empty.";
  }
  if (cartItemsTestContainer) {
    cartItemsTestContainer.textContent = "Your cart is empty.";
  }
  if (document.getElementById("subtotal"))
    document.getElementById("subtotal").textContent = "JOD 0.00";
  if (document.getElementById("shipping"))
    document.getElementById("shipping").textContent = "JOD 0.00";
  if (document.getElementById("total"))
    document.getElementById("total").textContent = "JOD 0.00";
}

function updateQuantityInLocalStorage(productId, newQuantity) {
  const cartItems = localStorage.getItem("cart");
  if (cartItems) {
    let cart = JSON.parse(cartItems);
    const productIndex = cart.findIndex(
      (item) => item.id === parseInt(productId)
    );
    if (productIndex > -1) {
      cart[productIndex].quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
}

function increaseQuantity(event) {
  const productId = event.target.dataset.productId;
  const quantitySpan = document.querySelector(
    `.item-quantity[data-product-id="${productId}"]`
  );
  const priceSpan = document.querySelector(
    `.item-price[data-product-id="${productId}"]`
  );

  if (productId && quantitySpan && priceSpan) {
    let currentQuantity = parseInt(quantitySpan.textContent);
    currentQuantity++;
    quantitySpan.textContent = currentQuantity;
    updateQuantityInLocalStorage(productId, currentQuantity);
    loadFromStorage(); // Reload to update the displayed price and summary
  }
}

function decreaseQuantity(event) {
  const productId = event.target.dataset.productId;
  const quantitySpan = document.querySelector(
    `.item-quantity[data-product-id="${productId}"]`
  );

  if (productId && quantitySpan) {
    let currentQuantity = parseInt(quantitySpan.textContent);
    if (currentQuantity > 1) {
      currentQuantity--;
      quantitySpan.textContent = currentQuantity;
      updateQuantityInLocalStorage(productId, currentQuantity);
      loadFromStorage(); // Reload to update the displayed price and summary
    } else if (currentQuantity === 1) {
      // If the quantity is 1, remove the item entirely
      const cartItems = localStorage.getItem("cart");
      if (cartItems) {
        let cart = JSON.parse(cartItems);
        const updatedCart = cart.filter(
          (item) => item.id !== parseInt(productId)
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        loadFromStorage(); // Reload to update the cart display
      }
    }
  }
}

function removeFromCart(event) {
  const productIdToRemove = event.target.dataset.productId;
  if (productIdToRemove) {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      let cart = JSON.parse(cartItems);
      const updatedCart = cart.filter(
        (item) => item.id !== parseInt(productIdToRemove)
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      loadFromStorage();
    }
  }
}

function clearCart() {
  localStorage.removeItem("cart");
  loadFromStorage();
}

function processPayment() {
  const cartItems = localStorage.getItem("cart");
  if (cartItems && JSON.parse(cartItems).length > 0) {
    alert("Payment processing simulated. Cart contents:\n" + cartItems);
    localStorage.removeItem("cart");
    loadFromStorage();
  } else {
    alert("Your cart is empty. Nothing to process.");
  }
}

// Newly added
function checkPaymentSummaryFields() {
  const fullNameInput = document.getElementById("full-name");
  const addressInput = document.getElementById("address");
  const phoneNumberInput = document.getElementById("phone-number");
  const paymentMethodSelect = document.getElementById("payment-method");

  if (!fullNameInput || fullNameInput.value.trim() === "") {
    alert("Please enter your full name in the Payment Summary.");
    return false;
  }
  if (!addressInput || addressInput.value.trim() === "") {
    alert("Please enter your shipping address in the Payment Summary.");
    return false;
  }
  if (!phoneNumberInput || phoneNumberInput.value.trim() === "") {
    alert("Please enter your phone number in the Payment Summary.");
    return false;
  }
  if (!paymentMethodSelect || paymentMethodSelect.value === "") {
    alert("Please select a payment method in the Payment Summary.");
    return false;
  }

  return true; // All fields are filled
}

document.addEventListener("DOMContentLoaded", function () {
  const showPaymentDetailsButton = document.getElementById(
    "show-payment-details-btn"
  ); // Now using the correct ID

  if (showPaymentDetailsButton) {
    showPaymentDetailsButton.addEventListener("click", function () {
      if (!checkPaymentSummaryFields()) {
        // Optionally, you could also prevent the "Payment Summary" section from expanding/collapsing here if you have that functionality.
        console.log("Payment Summary fields are not all filled.");
        // You might want to add visual cues here, like highlighting empty fields
      } else {
        // If all fields are filled, proceed with whatever action the button is supposed to do
        console.log("Payment Summary fields are all filled.");
        const paymentDetailsForm = document.getElementById(
          "payment-details-form"
        );
        if (paymentDetailsForm) {
          paymentDetailsForm.style.display = "block"; // Example: Show the payment details form
        }
        // You might also want to disable the "Show Payment Details" button after clicking
        this.disabled = true;
      }
    });
  }

  // Existing event listeners for input changes to manage the "Proceed to Checkout" button state
  const fullNameInput = document.getElementById("full-name");
  const addressInput = document.getElementById("address");
  const phoneNumberInput = document.getElementById("phone-number");
  const paymentMethodSelect = document.getElementById("payment-method");
  const proceedCheckoutButton = document.getElementById("proceed-checkout-btn");

  if (fullNameInput) {
    fullNameInput.addEventListener("input", validateCheckoutFields);
  }
  if (addressInput) {
    addressInput.addEventListener("input", validateCheckoutFields);
  }
  if (phoneNumberInput) {
    phoneNumberInput.addEventListener("input", validateCheckoutFields);
  }
  if (paymentMethodSelect) {
    paymentMethodSelect.addEventListener("change", validateCheckoutFields);
  }

  if (proceedCheckoutButton) {
    proceedCheckoutButton.addEventListener("click", checkout); // Directly call checkout on button click
  }

  // Initial validation on page load
  validateCheckoutFields();
});

function validateCheckoutFields() {
  const fullNameInput = document.getElementById("full-name");
  const addressInput = document.getElementById("address");
  const phoneNumberInput = document.getElementById("phone-number");
  const paymentMethodSelect = document.getElementById("payment-method");
  const checkoutButton = document.getElementById("proceed-checkout-btn");

  const allFieldsFilled =
    fullNameInput &&
    fullNameInput.value.trim() !== "" &&
    addressInput &&
    addressInput.value.trim() !== "" &&
    phoneNumberInput &&
    phoneNumberInput.value.trim() !== "" &&
    paymentMethodSelect &&
    paymentMethodSelect.value !== "";

  if (checkoutButton) {
    checkoutButton.disabled = !allFieldsFilled; // Disable if not all fields are filled
  }

  return allFieldsFilled;
}

function generateOrderIdDateRandom() {
  const timestamp = Date.now().toString(36); // Convert timestamp to base36
  const randomPart = Math.random().toString(36).substring(2, 12); // Longer random part (10 characters)
  return timestamp + randomPart;
}

function generateTrackingNumber() {
  const prefix = "TRACK"; // You can add a prefix
  const timestamp = Date.now().toString(36).substring(2, 8); // Shorter timestamp part
  const randomPart = Math.random().toString(36).substring(2, 8); // Random alphanumeric part
  return prefix + timestamp.toUpperCase() + randomPart.toUpperCase();
}

function checkout() {
  const fullNameInput = document.getElementById("full-name");
  const addressInput = document.getElementById("address");
  const phoneNumberInput = document.getElementById("phone-number");
  const paymentMethodSelect = document.getElementById("payment-method");

  const fullName = fullNameInput ? fullNameInput.value.trim() : "";
  const address = addressInput ? addressInput.value.trim() : "";
  const phoneNumber = phoneNumberInput ? phoneNumberInput.value.trim() : "";
  const paymentMethod = paymentMethodSelect ? paymentMethodSelect.value : "";

  if (fullName === "") {
    alert("Please enter your full name in the Payment Summary.");
    return;
  }
  if (address === "") {
    alert("Please enter your shipping address in the Payment Summary.");
    return;
  }
  if (phoneNumber === "") {
    alert("Please enter your phone number in the Payment Summary.");
    return;
  }
  if (paymentMethod === "") {
    alert("Please select a payment method in the Payment Summary.");
    return;
  }

  const cartItems = localStorage.getItem("cart");
  console.log("Cart items before checkout:", cartItems);

  const cart = JSON.parse(cartItems);
  // Generate the Order ID using the revised function
  const orderId = generateOrderIdDateRandom();
  const orderDate =
    new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  // Generate the Tracking Number
  const trackingNumber = generateTrackingNumber();

  const order = {
    orderId: orderId,
    orderDate: orderDate,
    trackingNumber: trackingNumber, // Add the tracking number to the order object
    items: cart,
    total: total,
    customerDetails: {
      fullName: fullName,
      address: address,
      phoneNumber: phoneNumber,
      paymentMethod: paymentMethod,
    },
    status: "In Progress", // Default status for new orders
  };

  localStorage.setItem("latestOrder", JSON.stringify(order));

  let existingOrders = localStorage.getItem("orders");
  let ordersArray = existingOrders ? JSON.parse(existingOrders) : [];
  ordersArray.push(order);
  localStorage.setItem("orders", JSON.stringify(ordersArray));

  localStorage.removeItem("cart");

  // alert(`Checkout successful! Your Order ID is: ${orderId}`);
  // Modified redirection to pass the orderId as a URL parameter
  window.location.href = `receipt.html?orderId=${orderId}`;
}
