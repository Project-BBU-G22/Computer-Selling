// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartContent = document.getElementById('cart-content');

    if (!cartItems) return;

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 999 ? 0 : 29.99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    // Update summary amounts
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;

    // Show/hide empty cart message
    if (cart.length === 0) {
        cartEmptyMessage?.classList.remove('hidden');
        cartContent?.classList.add('hidden');
    } else {
        cartEmptyMessage?.classList.add('hidden');
        cartContent?.classList.remove('hidden');
        
        // Update cart items display
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" data-id="${item.id}">
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `).join('');
    }
}

// Setup checkout button
function setupCheckoutButton() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Your cart is empty');
                return;
            }

            // Calculate totals
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = subtotal > 999 ? 0 : 29.99;
            const tax = subtotal * 0.1;
            const total = subtotal + shipping + tax;

            // Save order details to localStorage
            const orderDetails = {
                items: cart,
                subtotal: subtotal,
                shipping: shipping,
                tax: tax,
                total: total,
                orderDate: new Date().toISOString()
            };
            
            localStorage.setItem('currentOrder', JSON.stringify(orderDetails));
            
            // Redirect to checkout page
            window.location.href = 'checkout.html';
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    setupCheckoutButton();
});
