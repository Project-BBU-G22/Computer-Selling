// Sample product data
const products = [
    {
        id: 1,
        name: "MacBook Pro 16-inch M2 Pro",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "laptop",
        price: 2499.99,
        oldPrice: 2699.99,
        label: "sale",
        description: "The most powerful MacBook Pro ever with the M2 Pro chip for groundbreaking performance.",
        specs: {
            processor: "Apple M2 Pro 12-core CPU",
            ram: "16GB Unified Memory",
            storage: "512GB SSD",
            display: "16-inch Liquid Retina XDR"
        }
    },
    {
        id: 2,
        name: "Dell XPS Desktop",
        image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "desktop",
        price: 1799.99,
        label: "new",
        description: "Premium desktop workstation with the latest Intel processor and NVIDIA graphics.",
        specs: {
            processor: "Intel Core i7-13700K",
            ram: "32GB DDR5",
            storage: "1TB NVMe SSD + 2TB HDD",
            gpu: "NVIDIA RTX 4070"
        }
    },
    {
        id: 3,
        name: "Alienware Aurora R15",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "gaming",
        price: 2999.99,
        description: "Ultimate gaming desktop with liquid cooling and premium components.",
        specs: {
            processor: "Intel Core i9-13900KF",
            ram: "64GB DDR5",
            storage: "2TB NVMe SSD",
            gpu: "NVIDIA RTX 4090"
        }
    },
    {
        id: 4,
        name: "Dell XPS 13 Plus",
        image: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",  // Updated image URL
        category: "laptop",
        price: 1299.99,
        oldPrice: 1499.99,
        label: "sale",
        description: "Ultra-portable laptop with InfinityEdge display and capacitive touch function row.",
        specs: {
            processor: "Intel Core i7-1260P",
            ram: "16GB LPDDR5",
            storage: "512GB SSD",
            display: "13.4\" 3.5K OLED Touch"
        }
    },
    {
        id: 5,
        name: "HP Z6 G4 Workstation",
        image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "desktop",
        price: 4299.99,
        description: "Professional workstation for 3D rendering, CAD, and content creation.",
        specs: {
            processor: "Intel Xeon W-3365",
            ram: "128GB DDR4 ECC",
            storage: "4TB NVMe SSD + 8TB HDD",
            gpu: "NVIDIA RTX A5000"
        }
    },
    {
        id: 6,
        name: "Lenovo ThinkPad X1 Carbon Gen 11",
        image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "laptop",
        price: 1599.99,
        label: "new",
        description: "Business laptop with military-grade durability and premium features.",
        specs: {
            processor: "Intel Core i7-1355U",
            ram: "16GB LPDDR5",
            storage: "1TB SSD",
            display: "14\" 2.8K OLED"
        }
    },
    {
        id: 7,
        name: "ROG Strix G17",
        image: "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "gaming",
        price: 2199.99,
        description: "High-performance gaming laptop with AMD advantage.",
        specs: {
            processor: "AMD Ryzen 9 7945HX",
            ram: "32GB DDR5",
            storage: "1TB NVMe SSD",
            display: "17.3\" QHD 240Hz"
        }
    },
    {
        id: 8,
        name: "Intel NUC 13 Pro",
        image: "https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "desktop",
        price: 799.99,
        oldPrice: 899.99,
        label: "sale",
        description: "Compact but powerful mini PC for productivity and entertainment.",
        specs: {
            processor: "Intel Core i7-1360P",
            ram: "16GB DDR4",
            storage: "512GB NVMe SSD",
            gpu: "Intel Iris Xe Graphics"
        }
    },
    {
        id: 9,
        name: "MSI MEG Aegis Ti5",
        image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "gaming",
        price: 4499.99,
        label: "new",
        description: "Ultimate gaming desktop with futuristic design and top-tier performance.",
        specs: {
            processor: "Intel Core i9-13900K",
            ram: "64GB DDR5",
            storage: "2TB NVMe SSD + 3TB HDD",
            gpu: "NVIDIA RTX 4090"
        }
    },
    {
        id: 10,
        name: "Razer Blade 18",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "gaming",
        price: 3999.99,
        description: "Desktop replacement gaming laptop with stunning 18-inch display.",
        specs: {
            processor: "Intel Core i9-13950HX",
            ram: "32GB DDR5",
            storage: "2TB NVMe SSD",
            display: "18\" QHD+ 240Hz"
        }
    },
    {
        id: 11,
        name: "Corsair One i300",
        image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "gaming",
        price: 3799.99,
        description: "Compact yet powerful gaming PC with liquid cooling.",
        specs: {
            processor: "Intel Core i9-12900K",
            ram: "64GB DDR5",
            storage: "2TB NVMe SSD",
            gpu: "NVIDIA RTX 3080 Ti"
        }
    },
    {
        id: 12,
        name: "Apple Mac Studio",
        image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "desktop",
        price: 3999.99,
        label: "new",
        description: "Professional desktop with revolutionary Apple Silicon.",
        specs: {
            processor: "Apple M2 Ultra",
            ram: "128GB Unified Memory",
            storage: "4TB SSD",
            gpu: "38-core GPU"
        }
    },
    {
        id: 13,
        name: "Alienware x16",
        image: "https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "gaming",
        price: 2899.99,
        oldPrice: 3199.99,
        label: "sale",
        description: "Premium gaming laptop with advanced cooling technology.",
        specs: {
            processor: "Intel Core i9-13900HK",
            ram: "32GB DDR5",
            storage: "2TB NVMe SSD",
            display: "16\" QHD+ 240Hz"
        }
    },
    {
        id: 14,
        name: "ASUS ProArt Station",
        image: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "desktop",
        price: 4299.99,
        description: "Professional workstation for content creators.",
        specs: {
            processor: "Intel Core i9-13900K",
            ram: "128GB DDR5",
            storage: "4TB NVMe SSD",
            gpu: "NVIDIA RTX 4080"
        }
    },
    {
        id: 15,
        name: "Legion Tower 7i",
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "gaming",
        price: 3299.99,
        label: "new",
        description: "Powerful gaming tower with RGB lighting and premium cooling.",
        specs: {
            processor: "Intel Core i9-13900KF",
            ram: "64GB DDR5",
            storage: "2TB NVMe SSD + 2TB HDD",
            gpu: "NVIDIA RTX 4080"
        }
    },
    {
        id: 16,
        name: "HP Omen 45L",
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "gaming",
        price: 2899.99,
        oldPrice: 3199.99,
        label: "sale",
        description: "Gaming desktop with Cryo Chamber cooling technology.",
        specs: {
            processor: "AMD Ryzen 9 7950X",
            ram: "32GB DDR5",
            storage: "2TB NVMe SSD",
            gpu: "NVIDIA RTX 4070 Ti"
        }
    },
    {
        id: 17,
        name: "ROG Zephyrus M16",
        image: "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "laptop",
        price: 2499.99,
        description: "Ultra-slim gaming laptop with Mini LED display.",
        specs: {
            processor: "Intel Core i9-13900H",
            ram: "32GB DDR5",
            storage: "1TB NVMe SSD",
            display: "16\" QHD+ 240Hz Mini LED"
        }
    },
    {
        id: 18,
        name: "iMac 24-inch",
        image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "desktop",
        price: 1899.99,
        description: "Sleek all-in-one desktop with M2 chip.",
        specs: {
            processor: "Apple M2 8-core",
            ram: "16GB Unified Memory",
            storage: "512GB SSD",
            display: "24\" 4.5K Retina"
        }
    },
    {
        id: 19,
        name: "Razer Blade 14",
        image: "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "laptop",
        price: 2299.99,
        oldPrice: 2499.99,
        label: "sale",
        description: "Compact gaming laptop with NVIDIA Studio drivers.",
        specs: {
            processor: "AMD Ryzen 9 7940HS",
            ram: "32GB DDR5",
            storage: "1TB NVMe SSD",
            display: "14\" QHD 240Hz"
        }
    },
    {
        id: 20,
        name: "ThinkStation P620",
        image: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "desktop",
        price: 4999.99,
        description: "Professional workstation for intensive tasks.",
        specs: {
            processor: "AMD Threadripper PRO 5995WX",
            ram: "128GB DDR4 ECC",
            storage: "4TB NVMe SSD",
            gpu: "NVIDIA RTX A6000"
        }
    },
    {
        id: 21,
        name: "MacBook Pro 14",
        image: "https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "laptop",
        price: 1999.99,
        description: "Powerful laptop with stunning display.",
        specs: {
            processor: "Apple M2 Pro",
            ram: "32GB Unified Memory",
            storage: "1TB SSD",
            display: "14\" Liquid Retina XDR"
        }
    },
    {
        id: 22,
        name: "ROG Strix G15",
        image: "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "gaming",
        price: 1799.99,
        oldPrice: 1999.99,
        label: "sale",
        description: "Affordable gaming laptop with premium features.",
        specs: {
            processor: "AMD Ryzen 9 7945HX",
            ram: "16GB DDR5",
            storage: "1TB NVMe SSD",
            display: "15.6\" FHD 300Hz"
        }
    },
    {
        id: 23,
        name: "Mac Mini",
        image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "desktop",
        price: 799.99,
        description: "Compact desktop with M2 chip.",
        specs: {
            processor: "Apple M2",
            ram: "16GB Unified Memory",
            storage: "512GB SSD",
            gpu: "10-core GPU"
        }
    },
    {
        id: 24,
        name: "Surface Laptop Studio",
        image: "https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "laptop",
        price: 2199.99,
        label: "new",
        description: "Versatile laptop with unique form factor.",
        specs: {
            processor: "Intel Core i7-12700H",
            ram: "32GB DDR4",
            storage: "1TB NVMe SSD",
            display: "14.4\" 120Hz Touch"
        }
    },
    {
        id: 25,
        name: "Origin Neuron",
        image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "gaming",
        price: 3499.99,
        description: "Custom gaming PC with premium components.",
        specs: {
            processor: "Intel Core i9-13900KS",
            ram: "64GB DDR5",
            storage: "2TB NVMe SSD + 4TB HDD",
            gpu: "NVIDIA RTX 4080"
        }
    }
];

// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const productsContainer = document.getElementById('products-container');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('product-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');
const cartCount = document.getElementById('cart-count');
const newsletterForm = document.getElementById('newsletter-form');

// Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count and display immediately
    updateCartCount();
    updateCartDisplay();
    
    // Setup other functionality
    displayProducts('all');
    setupEventListeners();
    setupModals();
    setupSearch();
    setupAccount();
    setupPaymentValidation();
});

// Event Listeners
function setupEventListeners() {
    // Mobile Menu Toggle
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger to X
        const bars = mobileMenu.querySelectorAll('.bar');
        bars[0].classList.toggle('animate-top-bar');
        bars[1].classList.toggle('animate-middle-bar');
        bars[2].classList.toggle('animate-bottom-bar');
    });
    
    // Filter Products
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            displayProducts(category);
        });
    });
    
    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close Modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Newsletter Form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            if (email) {
                alert(`Thank you for subscribing with: ${email}`);
                newsletterForm.reset();
            }
        });
    }

    // Add checkout button event listener
    const checkoutBtn = document.getElementById('proceed-to-checkout');
    const cartModal = document.getElementById('cart-modal');
    const checkoutModal = document.getElementById('checkout-modal');

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty! Add some items before checking out.', 'error');
            return;
        }

        // Hide cart modal and show checkout modal
        cartModal.style.display = 'none';
        checkoutModal.style.display = 'block';
        
        // Update checkout summary
        updateCheckoutSummary();
    });

    // Add close button event listener for checkout modal
    const closeCheckoutBtn = document.querySelector('#checkout-modal .close-modal');
    closeCheckoutBtn.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    // Close checkout modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });
}

// Display Products
function displayProducts(category) {
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const priceHTML = product.oldPrice 
            ? `<div class="price"><span class="old-price">$${product.oldPrice.toFixed(2)}</span> $${product.price.toFixed(2)}</div>`
            : `<div class="price">$${product.price.toFixed(2)}</div>`;
        
        const labelHTML = product.label 
            ? `<span class="product-label ${product.label}">${product.label}</span>` 
            : '';
        
        productCard.innerHTML = `
            ${labelHTML}
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                ${priceHTML}
                <div class="product-footer">
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="quick-view" data-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
        
        // Add event listeners to the buttons
        productCard.querySelector('.add-to-cart').addEventListener('click', () => {
            addToCart(product.id);
        });
        
        productCard.querySelector('.quick-view').addEventListener('click', () => {
            openQuickView(product.id);
        });
    });
}

// Open Quick View Modal
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const priceHTML = product.oldPrice 
        ? `<span class="old-price">$${product.oldPrice}</span>$${product.price}` 
        : `$${product.price}`;
    
    const specsHTML = Object.entries(product.specs)
        .map(([key, value]) => `<div><span>${key.charAt(0).toUpperCase() + key.slice(1)}:</span> ${value}</div>`)
        .join('');
    
    modalBody.innerHTML = `
        <div class="product-modal">
            <div class="product-modal-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-modal-info">
                <h3>${product.name}</h3>
                <div class="category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <div class="price">${priceHTML}</div>
                <div class="product-description">
                    ${product.description}
                </div>
                <div class="product-meta">
                    ${specsHTML}
                </div>
                <div class="product-actions">
                    <div class="quantity-selector">
                        <span class="quantity-btn minus">-</span>
                        <input type="text" class="quantity-input" value="1" readonly>
                        <span class="quantity-btn plus">+</span>
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    const quantityInput = modalBody.querySelector('.quantity-input');
    const minusBtn = modalBody.querySelector('.minus');
    const plusBtn = modalBody.querySelector('.plus');
    
    minusBtn.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;
    });
    
    modalBody.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        addToCart(product.id, quantity);
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Display modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity = 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update both cart count and display
    updateCartCount();
    updateCartDisplay();
    showNotification(`Added ${product.name} to cart`);
}

// Update Cart Count
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

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add styles for notification
const style = document.createElement('style');
style.textContent = `
.notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--primary-color);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    transform: translateY(100px);
    opacity: 0;
    transition: transform 0.3s, opacity 0.3s;
    z-index: 1000;
}

.notification.show {
    transform: translateY(0);
    opacity: 1;
}

.animate-top-bar {
    transform: rotate(45deg) translate(6px, 6px);
}

.animate-middle-bar {
    opacity: 0;
}

.animate-bottom-bar {
    transform: rotate(-45deg) translate(6px, -6px);
}
`;
document.head.appendChild(style);

// Slider for hero section (optional enhancement)
class ImageSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        if (!this.slider) return;
        
        this.slides = this.slider.querySelectorAll('.slide');
        if (this.slides.length === 0) return;
        
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        this.init();
    }
    
    init() {
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'slider-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        this.slider.appendChild(dotsContainer);
        this.dots = dotsContainer.querySelectorAll('.slider-dot');
        
        // Add arrow navigation
        const prevArrow = document.createElement('div');
        prevArrow.className = 'slider-arrow prev';
        prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevArrow.addEventListener('click', () => this.prevSlide());
        
        const nextArrow = document.createElement('div');
        nextArrow.className = 'slider-arrow next';
        nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextArrow.addEventListener('click', () => this.nextSlide());
        
        this.slider.appendChild(prevArrow);
        this.slider.appendChild(nextArrow);
        
        // Start auto sliding
        this.startAutoSlide();
        
        // Pause auto slide on hover
        this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    goToSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.currentSlide = index;
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }
    
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
    }
}

// Initialize slider if hero section has slides
document.addEventListener('DOMContentLoaded', () => {
    const slider = new ImageSlider('.hero-slider');
});

// Modal functionality
function setupModals() {
    const searchIcon = document.querySelector('.nav-icons a[href="#search"]');
    const cartIcon = document.querySelector('.nav-icons a[href="#cart"]');
    const userIcon = document.querySelector('.nav-icons a[href="#account"]');
    
    const searchModal = document.getElementById('search-modal');
    const cartModal = document.getElementById('cart-modal');
    const accountModal = document.getElementById('account-modal');
    
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
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
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
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');
    const searchCategory = document.getElementById('search-category');
    const searchSort = document.getElementById('search-sort');
    const searchStatus = document.getElementById('search-status');
    const searchCount = document.querySelector('.search-count');
    const searchLoading = document.querySelector('.search-loading');
    const searchGrid = document.getElementById('search-grid');
    const searchEmpty = document.getElementById('search-empty');
    
    let searchTimeout;
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        const category = searchCategory.value;
        const sortBy = searchSort.value;
        
        // Show loading state
        searchLoading.classList.remove('hidden');
        searchGrid.innerHTML = '';
        searchEmpty.classList.add('hidden');
        searchStatus.classList.remove('hidden');
        
        // Simulate network delay
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            let results = products.filter(product => {
                const matchesQuery = product.name.toLowerCase().includes(query) ||
                                   product.description.toLowerCase().includes(query);
                const matchesCategory = !category || product.category === category;
                return matchesQuery && matchesCategory;
            });
            
            // Sort results
            results = sortResults(results, sortBy);
            
            // Update status
            searchLoading.classList.add('hidden');
            searchCount.textContent = `${results.length} products found`;
            
            if (results.length === 0) {
                searchGrid.classList.add('hidden');
                searchEmpty.classList.remove('hidden');
                return;
            }
            
            // Display results
            searchGrid.classList.remove('hidden');
            results.forEach(product => {
                const card = createSearchResultCard(product);
                searchGrid.appendChild(card);
            });
        }, 300); // Simulate network delay
    }
    
    function sortResults(results, sortBy) {
        switch (sortBy) {
            case 'price-asc':
                return results.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return results.sort((a, b) => b.price - a.price);
            case 'name-asc':
                return results.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return results; // Keep original order for relevance
        }
    }
    
    function createSearchResultCard(product) {
        const card = document.createElement('div');
        card.className = 'search-result-card';
        
        const priceDisplay = product.oldPrice 
            ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span> $${product.price.toFixed(2)}`
            : `$${product.price.toFixed(2)}`;
            
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="search-result-image">
            <div class="search-result-info">
                <div class="search-result-name">${product.name}</div>
                <div class="search-result-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <div class="search-result-price">${priceDisplay}</div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            // Close the search modal first
            const searchModal = document.getElementById('search-modal');
            searchModal.style.display = 'none';
            
            // Then open the quick view
            openQuickView(product.id);
        });
        
        return card;
    }
    
    // Input event listeners
    searchInput.addEventListener('input', () => {
        searchClear.classList.toggle('hidden', !searchInput.value);
        performSearch();
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Clear button
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.classList.add('hidden');
        searchInput.focus();
        performSearch();
    });
    
    // Filter changes
    searchCategory.addEventListener('change', performSearch);
    searchSort.addEventListener('change', performSearch);
    
    // Focus input when modal opens
    document.querySelector('a[href="#search"]').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('search-modal').style.display = 'block';
        searchInput.focus();
    });
}

// Cart functionality
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
    setupCheckout(); // Ensure checkout is set up after updating cart display
}

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

// Account functionality
function setupAccount() {
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
}

function setupCheckout() {
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

function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkout-items');
    const subtotalElement = document.getElementById('checkout-subtotal');
    const shippingElement = document.getElementById('checkout-shipping');
    const taxElement = document.getElementById('checkout-tax');
    const totalElement = document.getElementById('checkout-total');

    checkoutItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        subtotal += product.price * item.quantity;

        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        itemElement.innerHTML = `
            <div class="item-details">
                <span>${product.name} × ${item.quantity}</span>
                <span>$${(product.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
        checkoutItems.appendChild(itemElement);
    });

    const shipping = subtotal > 999 ? 0 : 29.99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function processOrder(event) {
    event.preventDefault();

    // Validate form
    if (!validatePaymentForm()) {
        return;
    }

    // Here you would typically send the order to your backend
    showNotification('Order placed successfully! Thank you for your purchase.', 'success');
    
    // Clear cart
    cart = [];
    updateCartCount();
    
    // Close checkout modal
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.style.display = 'none';
    
    // Reset form
    document.getElementById('checkout-form').reset();
}

function setupPaymentValidation() {
    const cardNumber = document.getElementById('cardNumber');
    const expiry = document.getElementById('expiry');
    const cvv = document.getElementById('cvv');
    const cardIcons = document.querySelectorAll('.card-icons i');

    // Format card number
    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = value;

        // Update card icon
        const cardType = getCardType(value.replace(/\s/g, ''));
        updateCardIcon(cardType);
    });

    // Format expiry date
    expiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });

    // Limit CVV to 3-4 digits
    cvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    });

    function getCardType(number) {
        if (number.startsWith('4')) return 'visa';
        if (/^5[1-5]/.test(number)) return 'mastercard';
        if (/^3[47]/.test(number)) return 'amex';
        return null;
    }

    function updateCardIcon(cardType) {
        cardIcons.forEach(icon => {
            icon.classList.remove('active');
            if (cardType && icon.dataset.card === cardType) {
                icon.classList.add('active');
            }
        });
    }
}

function validatePaymentForm() {
    const cardNumber = document.getElementById('cardNumber');
    const expiry = document.getElementById('expiry');
    const cvv = document.getElementById('cvv');
    const cardName = document.getElementById('cardName');

    // Basic validation
    if (!isValidCardNumber(cardNumber.value)) {
        showNotification('Please enter a valid card number', 'error');
        return false;
    }

    if (!isValidExpiry(expiry.value)) {
        showNotification('Please enter a valid expiry date', 'error');
        return false;
    }

    if (!isValidCVV(cvv.value)) {
        showNotification('Please enter a valid CVV', 'error');
        return false;
    }

    return true;
}

function isValidCardNumber(number) {
    return number.replace(/\s/g, '').length >= 15;
}

function isValidExpiry(expiry) {
    const [month, year] = expiry.split('/');
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    return month >= 1 && month <= 12 && 
           year >= currentYear && 
           (year > currentYear || month >= currentMonth);
}

function isValidCVV(cvv) {
    return cvv.length >= 3 && cvv.length <= 4;
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // Debug log
    setupModals();
    setupSearch();
    setupAccount();
    setupPaymentValidation();
});
