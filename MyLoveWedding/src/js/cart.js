export function addToCart(itemType, item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (!cart[itemType]) {
        cart[itemType] = [];
    }
    cart[itemType].push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

export function removeFromCart(itemType, itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[itemType]) {
        cart[itemType] = cart[itemType].filter(item => item.id !== itemId);
        if (cart[itemType].length === 0) {
            delete cart[itemType];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

export function updateCartDisplay() {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    let cartDisplay = document.getElementById('cart-items');
    if (cartDisplay) {
        cartDisplay.innerHTML = ''; // Clear existing content
        let total = 0;

        for (let itemType in cart) {
            if (cart.hasOwnProperty(itemType)) {
                cart[itemType].forEach(item => {
                    let itemElement = document.createElement('div');
                    itemElement.innerHTML = `${item.name} (${itemType}): $${item.pricing || item.fees || item.price}
                                              <button class="remove-from-cart" data-item-type="${itemType}" data-item-id="${item.id}">Remove</button>`;
                    cartDisplay.appendChild(itemElement);
                    total += item.pricing || item.fees || item.price;

                    // Add event listener to the remove button
                    itemElement.querySelector('.remove-from-cart').addEventListener('click', function () {
                        const itemType = this.dataset.itemType;
                        const itemId = this.dataset.itemId;
                        removeFromCart(itemType, itemId);
                    });
                });
            }
        }

        // Display total
        let totalElement = document.createElement('div');
        totalElement.textContent = `Total: $${total}`;
        cartDisplay.appendChild(totalElement);
    }
}