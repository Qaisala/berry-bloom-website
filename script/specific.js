//
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  const productId = urlParams.get("productId");

  if (productId) {
    // const product = testArray.find((p) => p.id === parseInt(productId));
    const product = products.find((p) => p.id === parseInt(productId));

    if (product) {
      console.log("Found product:", product);
      displayProductDetails(product);
      updateCartCount();
      loadExistingReviews(productId); // Load any existing "locally stored" reviews
      setupReviewForm(productId);
    }
  }
});

function displayProductDetails(product) {
  const specificProduct = document.getElementById("specific-product");

  const productSpecificDiv = document.createElement("div");
  productSpecificDiv.classList.add("specific-item");

  productSpecificDiv.innerHTML = `
 <div class="left-section">

   <img src="${product.image}" class="specific-image">
   <h2>${product.name}</h2>
      <p class="product-price">JOD ${product.price.toFixed(2)}</p>
      <p class="description-left">${product.description}</p>
   <img src="${product.ratingImg}" class="specific-rating">
     <button class="add-to-cart" onclick="this.classList.add('clicked'); setTimeout(() => this.classList.remove('clicked'), 500); addToCart('${
       product.id
     }', '${product.name}', '${product.price}', '${product.imageSmall}')">
        <span>Add to Cart</span>
        <span class="cart-icon-svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z"/></svg>
        </span>
      </button> </div>

        <div class="right-section">
          <h1 class="h1-header">About "${product.name}"</h1>
          <p class="description-right">${product.descriptionAbout}</p>
          <h2 class="h2-header">Suggested Use</h2>
          
          <p class="description">${product.descriptionSuggested}</p>

          </div>
    `;
  specificProduct.appendChild(productSpecificDiv);
}

// Function to load and display existing reviews from local storage
function loadExistingReviews(productId) {
  const existingReviewsDiv = document.getElementById("existing-reviews");
  const storedReviews = localStorage.getItem(`reviews-${productId}`);

  if (storedReviews) {
    const reviews = JSON.parse(storedReviews);
    if (reviews.length > 0) {
      existingReviewsDiv.innerHTML = ""; // Clear the "No reviews yet" message
      reviews.forEach((review) => {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("customer-review");
        reviewElement.innerHTML = `
          <p><strong>Rating:</strong> ${getStarRating(review.rating)}</p>
          <p>${review.comment}</p>
          ${review.name ? `<p>By: ${review.name}</p>` : ""}
          <hr>
        `;
        existingReviewsDiv.appendChild(reviewElement);
      });
    }
  }
}

function setupReviewForm(productId) {
  const reviewForm = document.getElementById("review-form");

  if (reviewForm) {
    reviewForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const rating = document.getElementById("rating").value;
      const comment = document.getElementById("comment").value;
      const name = document.getElementById("name").value;

      const newReview = {
        rating: parseInt(rating),
        comment: comment,
        name: name,
      };

      // Save the new review to local storage
      saveReviewLocally(productId, newReview);

      // Update the displayed reviews
      loadExistingReviews(productId);

      // Optionally, clear the form after submission
      reviewForm.reset();
      alert("Thank you for your review!");
    });
  }
}

// Function to save a review to local storage
function saveReviewLocally(productId, review) {
  const storedReviews = localStorage.getItem(`reviews-${productId}`);
  let reviews = storedReviews ? JSON.parse(storedReviews) : [];
  reviews.push(review);
  localStorage.setItem(`reviews-${productId}`, JSON.stringify(reviews));
}

// Helper function to generate star rating HTML
function getStarRating(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars +=
      i < rating
        ? '<span class="star">★</span>'
        : '<span class="empty-star">☆</span>';
  }
  return stars;
}
