// Initialize modal functionality
function initializeModals() {
    // Get modal elements
    const searchModal = document.getElementById('search-modal');
    const cartModal = document.getElementById('cart-modal');
    const accountModal = document.getElementById('account-modal');
    
    // Get trigger elements
    const searchIcon = document.querySelector('.nav-icons a[href="#search"]');
    const cartIcon = document.querySelector('.nav-icons a[href="#cart"]');
    const userIcon = document.querySelector('.nav-icons a[href="#account"]');
    
    // Get close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Setup modal triggers
    searchIcon.addEventListener('click', (e) => {
        e.preventDefault();
        searchModal.style.display = 'block';
        document.getElementById('search-input').focus();
    });
    
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'block';
        updateCartDisplay();
    });
    
    userIcon.addEventListener('click', (e) => {
        e.preventDefault();
        accountModal.style.display = 'block';
    });
    
    // Close button functionality
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            searchModal.style.display = 'none';
            cartModal.style.display = 'none';
            accountModal.style.display = 'none';
        });
    });
    
    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === searchModal || e.target === cartModal || e.target === accountModal) {
            searchModal.style.display = 'none';
            cartModal.style.display = 'none';
            accountModal.style.display = 'none';
        }
    });
    
    // Setup account form switching
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });
    
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Add direct checkout button handler
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'checkout-btn') {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            
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
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeModals();
    setupCheckoutButton();
    updateCartDisplay(); // Add this to update cart on page load
});

// Add this helper function if it doesn't exist
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (!notification) {
        // Create notification element if it doesn't exist
        const notif = document.createElement('div');
        notif.id = 'notification';
        document.body.appendChild(notif);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function setupCheckoutButton() {
    const checkoutBtns = document.querySelectorAll('.checkout-btn');
    
    checkoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            
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
    });
}
