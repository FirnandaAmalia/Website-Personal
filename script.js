document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("menuModal");
  const span = document.getElementsByClassName("close")[0];
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalPrice = document.getElementById("modalPrice");
  const addToCartBtn = document.getElementById("addToCartBtn");
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const statusElement = document.getElementById("status");
  const dineInCheckbox = document.getElementById("dineIn");
  const takeAwayCheckbox = document.getElementById("takeAway");
  const deliveryCheckbox = document.getElementById("delivery");

  let selectedItem = null;
  let cart = [];
  let total = 0;

  // When the user clicks on a menu item, open the modal
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      selectedItem = {
        name: item.getAttribute("data-name"),
        price: parseInt(item.getAttribute("data-price")),
        description: item.getAttribute("data-description"),
      };
      modalTitle.textContent = selectedItem.name;
      modalDescription.textContent = selectedItem.description;
      modalPrice.textContent = `Harga: Rp ${selectedItem.price}`;
      modal.style.display = "block";
    });
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = () => {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Add item to cart
  addToCartBtn.addEventListener("click", () => {
    cart.push(selectedItem);
    total += selectedItem.price;
    updateCart();
    modal.style.display = "none";
  });

  // Clear cart
  clearCartBtn.addEventListener("click", () => {
    cart = [];
    total = 0;
    updateCart();
  });

  function updateCart() {
    cartItems.innerHTML = "";
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - Rp ${item.price}`;
      cartItems.appendChild(li);
    });
    totalPrice.textContent = `Total: Rp ${total}`;
  }

  // Check the current time and set the status
  function checkStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    if (currentHour >= 10 && currentHour < 23) {
      statusElement.textContent = "Buka";
    } else {
      statusElement.textContent = "Tutup";
    }
  }

  // Initial check
  checkStatus();

  // Set interval to check status every minute
  setInterval(checkStatus, 60000);
});
