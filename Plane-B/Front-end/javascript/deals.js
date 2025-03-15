// Sample deals data
const deals = [
    {
        id: 1,
        name: "Gaming Bundle Pro",
        image: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
        category: "bundle",
        price: 1999.99,
        oldPrice: 2499.99,
        discount: 20,
        description: "Complete gaming setup including PC, monitor, and accessories",
        endDate: "2024-12-31"
    },
    {
        id: 2,
        name: "Clearance: Last Gen Laptops",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
        category: "clearance",
        price: 899.99,
        oldPrice: 1299.99,
        discount: 30,
        description: "Previous generation laptops at unbeatable prices",
        endDate: "2024-12-25"
    },
    {
        id: 3,
        name: "Flash Sale: Gaming Peripherals",
        image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
        category: "flash",
        price: 149.99,
        oldPrice: 249.99,
        discount: 40,
        description: "High-performance gaming peripherals at amazing prices",
        endDate: "2024-12-20" // This date will be used for the countdown
    },
    {
        id: 4,
        name: "Office Setup Bundle",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
        category: "bundle",
        price: 1299.99,
        oldPrice: 1699.99,
        discount: 23,
        description: "Complete home office setup with ergonomic furniture",
        endDate: "2024-12-28"
    },
    {
        id: 5,
        name: "Gaming Console Bundle",
        image: "https://images.unsplash.com/photo-1592155931584-901ac15763e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
        category: "bundle",
        price: 599.99,
        oldPrice: 799.99,
        discount: 25,
        description: "Latest gaming console with games and accessories",
        endDate: "2024-12-30"
    }
];

// DOM Elements
const dealsContainer = document.getElementById('deals-container');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display deals
function displayDeals(category = 'all') {
    dealsContainer.innerHTML = '';
    
    const filteredDeals = category === 'all' 
        ? deals 
        : deals.filter(deal => deal.category === category);

    filteredDeals.forEach(deal => {
        const dealCard = document.createElement('div');
        dealCard.className = 'deal-card';
        dealCard.dataset.id = deal.id; // Add data-id attribute
        
        const discountBadge = `<div class="discount-badge">-${deal.discount}%</div>`;
        
        dealCard.innerHTML = `
            ${discountBadge}
            <div class="deal-image">
                <img src="${deal.image}" alt="${deal.name}">
            </div>
            <div class="deal-info">
                <h3>${deal.name}</h3>
                <div class="deal-category">${deal.category}</div>
                <p>${deal.description}</p>
                <div class="deal-price">
                    <span class="new-price">$${deal.price.toFixed(2)}</span>
                    <span class="old-price">$${deal.oldPrice.toFixed(2)}</span>
                </div>
                <button class="buy-now-btn" data-id="${deal.id}">Buy Now</button>
            </div>
        `;
        
        dealsContainer.appendChild(dealCard);
    });

    // Setup buy now buttons after adding deals to DOM
    setupBuyNowButtons();
}

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        // Display filtered deals
        displayDeals(btn.getAttribute('data-filter'));
    });
});

// Initialize countdown timer
function initCountdown() {
    // Get the Flash Sale end date from the deals array
    const flashSale = deals.find(deal => deal.category === 'flash');
    const countdownDate = new Date(flashSale.endDate).getTime();
    
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = "FLASH SALE HAS ENDED";
        }
    }, 1000);
}

// Add to cart function
function addToCart(dealId) {
    const deal = deals.find(d => d.id === dealId);
    if (!deal) {
        console.error('Deal not found:', dealId);
        return;
    }
    
    const existingItem = cart.find(item => item.id === dealId);
    if (existingItem) {
        existingItem.quantity = 1;
    } else {
        cart.push({
            id: dealId,
            name: deal.name,
            price: deal.price,
            image: deal.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    showNotification('Item added to cart');
}

// Update cart count
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCountElements.forEach(cartCount => {
        if (cartCount) {
            const totalItems = currentCart.reduce((sum, item) => sum + 1, 0);
            cartCount.textContent = totalItems.toString();
        }
    });
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartContent = document.getElementById('cart-content');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    
    if (!cartItems || !cartContent || !cartEmptyMessage) return;
    
    // Get latest cart data from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartContent.classList.add('hidden');
        cartEmptyMessage.classList.remove('hidden');
        return;
    }
    
    cartContent.classList.remove('hidden');
    cartEmptyMessage.classList.add('hidden');
    
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
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
        `;
        
        cartItems.appendChild(itemElement);
    });
    
    // Calculate costs
    const shipping = subtotal > 999 ? 0 : 29.99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    
    // Update summary
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    
    setupCartEventListeners();
    setupCheckoutButton();
}

// Setup cart event listeners
function setupCartEventListeners() {
    // Remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.remove-item').dataset.id);
            // Update cart array
            cart = cart.filter(item => item.id !== id);
            // Update localStorage immediately
            localStorage.setItem('cart', JSON.stringify(cart));
            // Update UI
            updateCartDisplay();
            updateCartCount();
            showNotification('Item removed from cart');
        });
    });

    // Quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const item = cart.find(item => item.id === id);
            if (!item) return;
            
            if (e.target.classList.contains('minus') && item.quantity > 1) {
                item.quantity = Number(item.quantity) - 1;
            } else if (e.target.classList.contains('plus') && item.quantity < 99) {
                item.quantity = Number(item.quantity) + 1;
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
        });
    });

    // Quantity input
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = parseInt(e.target.dataset.id);
            const item = cart.find(item => item.id === id);
            if (!item) return;
            
            const newQuantity = parseInt(e.target.value);
            if (newQuantity >= 1 && newQuantity <= 99) {
                item.quantity = Number(newQuantity);
            } else {
                e.target.value = item.quantity;
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
        });
    });
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Setup buy now buttons
function setupBuyNowButtons() {
    document.querySelectorAll('.buy-now-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const dealId = e.target.dataset.id;
            addToCart(dealId);
        });
    });
}

// Setup featured deal button
function setupFeaturedDealButton() {
    const featuredDealBtn = document.querySelector('.featured-deal-btn');
    if (featuredDealBtn) {
        featuredDealBtn.addEventListener('click', (e) => {
            const dealId = e.target.dataset.id;
            addToCart(dealId);
        });
    }
}

// Add setupCheckoutButton function
function setupCheckoutButton() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Your cart is empty');
                return;
            }

            // Calculate total
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count and display immediately
    updateCartCount();
    updateCartDisplay();
    
    // Display initial deals
    displayDeals();
    
    // Setup featured deal button
    setupFeaturedDealButton();
    
    // Setup filter functionality
    setupFilterButtons();
    
    // Setup checkout button
    setupCheckoutButton();
});

// Export cart-related functions if needed by other scripts
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;
