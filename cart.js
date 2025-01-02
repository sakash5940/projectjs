document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-container");
    const totalValueEl = document.getElementById("total-value");
    const buyNowButton = document.getElementById("buy-now-button");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to render the cart
    const renderCart = () => {
        cartContainer.innerHTML = "";
        let totalValue = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.quantity * parseFloat(item.description.split(" ")[1]);
            totalValue += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="Product">
                <div class="item-details">
                    <p>${item.description}</p>
                    <p>Quantity: <span>${item.quantity}</span></p>
                    <div class="quantity-control">
                        <button class="decrease" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-index="${index}">+</button>
                    </div>
                    <p>Total: $<span>${itemTotal.toFixed(2)}</span></p>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        totalValueEl.textContent = totalValue.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    // Update cart quantity
    const updateQuantity = (index, change) => {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); // Remove item if quantity is zero
        }
        renderCart();
    };

    // Handle clicks for increase/decrease buttons
    cartContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("increase")) {
            const index = event.target.getAttribute("data-index");
            updateQuantity(index, 1);
        } else if (event.target.classList.contains("decrease")) {
            const index = event.target.getAttribute("data-index");
            updateQuantity(index, -1);
        }
    });

    // Handle Buy Now
    buyNowButton.addEventListener("click", () => {
        Swal.fire({
            title: "Confirm Purchase",
            text: "Are you sure you want to buy these items?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, buy now!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                // Simulate purchase success or failure
                const success = Math.random() > 0.2; // 80% chance of success
                if (success) {
                    Swal.fire("Purchase Successful", "Your order has been placed!", "success");
                    cart = [];
                    localStorage.removeItem("cart");
                    renderCart();
                } else {
                    Swal.fire("Purchase Failed", "Something went wrong. Try again.", "error");
                }
            }
        });
    });

    // Initial render
    renderCart();
});
