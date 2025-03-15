document.addEventListener('DOMContentLoaded', () => {
    setupShippingValidation();
    setupPaymentForm();
    setupCountryProvinceSelection();
    initializeDeliveryOptions();
    // Get order details from localStorage
    const orderDetails = JSON.parse(localStorage.getItem('currentOrder'));
    
    if (!orderDetails || !orderDetails.items.length) {
        window.location.href = 'deals.html';
        return;
    }

    // Display order items
    displayOrderSummary(orderDetails);
    setupFormValidation();
    setupPaymentValidation();
});

function displayOrderSummary(orderDetails) {
    const checkoutItems = document.getElementById('checkout-items');
    checkoutItems.innerHTML = '';

    orderDetails.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        itemElement.innerHTML = `
            <div class="item-info">
                <img src="${item.image}" alt="${item.name}" class="item-thumbnail">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-quantity">Quantity: ${item.quantity}</p>
                    <p class="item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `;
        checkoutItems.appendChild(itemElement);
    });

    // Update summary
    document.getElementById('checkout-subtotal').textContent = `$${orderDetails.subtotal.toFixed(2)}`;
    document.getElementById('checkout-shipping').textContent = `$${orderDetails.shipping.toFixed(2)}`;
    document.getElementById('checkout-tax').textContent = `$${orderDetails.tax.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${orderDetails.total.toFixed(2)}`;
}

function setupFormValidation() {
    const form = document.getElementById('checkout-form');
    const inputs = form.querySelectorAll('input[required]');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });

        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });

    // ZIP code validation
    const zipInput = document.getElementById('zip');
    zipInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
    });

    // Email validation
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('invalid');
            emailInput.setCustomValidity('Please enter a valid email address');
        } else {
            emailInput.classList.remove('invalid');
            emailInput.setCustomValidity('');
        }
    });

    form.addEventListener('submit', handleFormSubmit);
}

function setupPaymentValidation() {
    const cardNumber = document.getElementById('cardNumber');
    const expiry = document.getElementById('expiry');
    const cvv = document.getElementById('cvv');

    // Card number formatting and validation
    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = value.slice(0, 19);
        
        validateCardNumber(cardNumber);
    });

    // Expiry date formatting and validation
    expiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        e.target.value = value.slice(0, 5);
        
        validateExpiry(expiry);
    });

    // CVV validation
    cvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
        validateCVV(cvv);
    });
}

function validateInput(input) {
    if (!input.value.trim()) {
        input.classList.add('invalid');
        input.setCustomValidity('This field is required');
    } else {
        input.classList.remove('invalid');
        input.setCustomValidity('');
    }
}

function validateCardNumber(input) {
    const value = input.value.replace(/\s/g, '');
    const isValid = /^\d{16}$/.test(value);
    
    if (!isValid) {
        input.classList.add('invalid');
        input.setCustomValidity('Please enter a valid 16-digit card number');
    } else {
        input.classList.remove('invalid');
        input.setCustomValidity('');
    }
}

function validateExpiry(input) {
    const value = input.value;
    const [month, year] = value.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (!/^\d{2}\/\d{2}$/.test(value) || 
        parseInt(month) < 1 || 
        parseInt(month) > 12 ||
        (parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth))) {
        input.classList.add('invalid');
        input.setCustomValidity('Please enter a valid expiry date (MM/YY)');
    } else {
        input.classList.remove('invalid');
        input.setCustomValidity('');
    }
}

function validateCVV(input) {
    if (!/^\d{3}$/.test(input.value)) {
        input.classList.add('invalid');
        input.setCustomValidity('Please enter a valid 3-digit CVV');
    } else {
        input.classList.remove('invalid');
        input.setCustomValidity('');
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    // Simulate order processing
    setTimeout(() => {
        // Clear cart and order details
        localStorage.removeItem('cart');
        localStorage.removeItem('currentOrder');

        // Show success message and redirect
        showOrderConfirmation();
    }, 2000);
}

function showOrderConfirmation() {
    // Create modal for order confirmation
    const modal = document.createElement('div');
    modal.className = 'order-confirmation-modal';
    modal.innerHTML = `
        <div class="confirmation-content">
            <i class="fas fa-check-circle success-icon"></i>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. You will receive an email confirmation shortly.</p>
            <button onclick="window.location.href='deals.html'" class="continue-shopping-btn">
                Continue Shopping
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

function setupShippingValidation() {
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '').slice(0, 10);
        e.target.value = value;
    });

    // ZIP code formatting
    const zipInput = document.getElementById('zip');
    zipInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '').slice(0, 5);
        e.target.value = value;
    });

    // Name validation
    const nameInputs = document.querySelectorAll('#firstName, #lastName');
    nameInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[0-9]/g, '');
        });
    });

    // Update shipping cost based on selection
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    shippingOptions.forEach(option => {
        option.addEventListener('change', updateShippingCost);
    });

    // Character counter for delivery instructions
    const instructionsTextarea = document.getElementById('instructions');
    if (instructionsTextarea) {
        const maxLength = instructionsTextarea.getAttribute('maxlength');
        instructionsTextarea.addEventListener('input', () => {
            const remaining = maxLength - instructionsTextarea.value.length;
            const small = instructionsTextarea.nextElementSibling;
            small.textContent = `${remaining} characters remaining`;
        });
    }
}

function updateShippingCost() {
    const shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
    const shippingCost = shippingMethod === 'standard' ? 29.99 : 49.99;
    
    // Update the order summary
    const subtotal = parseFloat(document.getElementById('checkout-subtotal').textContent.replace('$', ''));
    const tax = subtotal * 0.1;
    const total = subtotal + shippingCost + tax;

    document.getElementById('checkout-shipping').textContent = `$${shippingCost.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
}

// Payment Form Handling
function setupPaymentForm() {
    const cardNumber = document.getElementById('cardNumber');
    const expiry = document.getElementById('expiry');
    const cvv = document.getElementById('cvv');
    const cardName = document.getElementById('cardName');
    const sameAsShipping = document.getElementById('sameAsShipping');
    const billingAddressFields = document.getElementById('billingAddressFields');

    // Card number formatting and validation
    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        // Add space every 4 digits
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value;
        
        // Detect card type and update icon
        const cardType = detectCardType(value.replace(/\s/g, ''));
        updateCardIcon(cardType);
        validateCardNumber(value);
    });

    // Expiry date formatting and validation
    expiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0,2) + '/' + value.slice(2,4);
        }
        e.target.value = value;
        validateExpiry(value);
    });

    // CVV validation
    cvv.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
        validateCVV(value);
    });

    // Card name validation
    cardName.addEventListener('input', (e) => {
        validateCardName(e.target.value);
    });

    // Billing address toggle
    sameAsShipping.addEventListener('change', (e) => {
        billingAddressFields.classList.toggle('hidden', e.target.checked);
        if (e.target.checked) {
            copyShippingToBilling();
        }
    });
}

function detectCardType(number) {
    // Regex patterns for card detection
    const patterns = {
        visa: /^4/,
        mastercard: /^5[1-5]/,
        amex: /^3[47]/,
        discover: /^6(?:011|5)/
    };

    for (const [card, pattern] of Object.entries(patterns)) {
        if (pattern.test(number)) {
            return card;
        }
    }
    return 'unknown';
}

function updateCardIcon(cardType) {
    const cardIcons = document.querySelectorAll('.card-icons i');
    cardIcons.forEach(icon => {
        icon.classList.toggle('active', icon.dataset.card === cardType);
    });
}

function validateCardNumber(value) {
    const errorElement = document.querySelector('#cardNumber + .error-message');
    const cleanValue = value.replace(/\s/g, '');
    
    if (cleanValue.length < 13 || cleanValue.length > 19) {
        showError(errorElement, 'Please enter a valid card number');
        return false;
    }
    
    // Luhn algorithm validation
    if (!luhnCheck(cleanValue)) {
        showError(errorElement, 'Invalid card number');
        return false;
    }
    
    hideError(errorElement);
    return true;
}

function validateExpiry(value) {
    const errorElement = document.querySelector('#expiry + .error-message');
    const [month, year] = value.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (!month || !year || month > 12 || month < 1) {
        showError(errorElement, 'Invalid expiry date');
        return false;
    }

    if ((year < currentYear) || (year == currentYear && month < currentMonth)) {
        showError(errorElement, 'Card has expired');
        return false;
    }

    hideError(errorElement);
    return true;
}

function validateCVV(value) {
    const errorElement = document.querySelector('#cvv + .error-message');
    const cardType = detectCardType(document.getElementById('cardNumber').value.replace(/\s/g, ''));
    const isAmex = cardType === 'amex';
    const validLength = isAmex ? 4 : 3;

    if (value.length !== validLength) {
        showError(errorElement, `CVV must be ${validLength} digits`);
        return false;
    }

    hideError(errorElement);
    return true;
}

function validateCardName(value) {
    const errorElement = document.querySelector('#cardName + .error-message');
    if (value.length < 2 || !/^[a-zA-Z\s]+$/.test(value)) {
        showError(errorElement, 'Please enter the name as shown on your card');
        return false;
    }
    hideError(errorElement);
    return true;
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function hideError(element) {
    element.style.display = 'none';
}

function luhnCheck(value) {
    let sum = 0;
    let isEven = false;
    
    // Loop through values starting from the rightmost digit
    for (let i = value.length - 1; i >= 0; i--) {
        let digit = parseInt(value.charAt(i), 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return (sum % 10) === 0;
}

// Initialize payment form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupPaymentForm();
});

const provincesByCountry = {
    'KH': [
        { code: 'SR', name: 'Siem Reap' },
        { code: 'PH', name: 'Phnom Penh' },
        { code: 'BTB', name: 'Battambang' },
        { code: 'KK', name: 'Kampong Cham' },
        { code: 'KMT', name: 'Kampot' },
        { code: 'KLB', name: 'Koh Kong' },
        { code: 'KBT', name: 'Kandal' }
    ],
    'TH': [
        { code: 'BKK', name: 'Bangkok' },
        { code: 'CNX', name: 'Chiang Mai' },
        { code: 'HKT', name: 'Phuket' },
        { code: 'PKT', name: 'Pattaya' }
    ],
    'VN': [
        { code: 'HN', name: 'Hanoi' },
        { code: 'HCMC', name: 'Ho Chi Minh City' },
        { code: 'DN', name: 'Da Nang' },
        { code: 'HP', name: 'Hai Phong' }
    ]
    // Add more countries and their provinces as needed
};

function setupCountryProvinceSelection() {
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');

    if (countrySelect && stateSelect) {
        countrySelect.addEventListener('change', function() {
            const selectedCountry = this.value;
            const provinces = provincesByCountry[selectedCountry] || [];

            // Clear existing options
            stateSelect.innerHTML = '<option value="">Select Province</option>';

            // Add new options based on selected country
            provinces.forEach(province => {
                const option = document.createElement('option');
                option.value = province.code;
                option.textContent = province.name;
                stateSelect.appendChild(option);
            });

            // Update shipping costs based on country
            updateShippingCostsByCountry(selectedCountry);
        });
    }
}

function updateShippingCostsByCountry(country) {
    // Define shipping costs by country
    const shippingRates = {
        'KH': { standard: 5.99, express: 7.99 },
        'TH': { standard: 8.99, express: 12.99 },
        'VN': { standard: 8.99, express: 12.99 },
        'default': { standard: 15.99, express: 24.99 }
    };

    const rates = shippingRates[country] || shippingRates.default;
    
    // Update shipping option prices in the DOM
    const standardShippingPrice = document.querySelector('input[value="standard"] + .radio-label + .shipping-price');
    const expressShippingPrice = document.querySelector('input[value="express"] + .radio-label + .shipping-price');

    if (standardShippingPrice) {
        standardShippingPrice.textContent = `$${rates.standard.toFixed(2)}`;
    }
    if (expressShippingPrice) {
        expressShippingPrice.textContent = `$${rates.express.toFixed(2)}`;
    }

    // Update total cost
    updateShippingCost();
}

// Add this to your existing window.onload or DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    setupCountryProvinceSelection();
    // ... your existing initialization code
});

// Delivery Options Handler
function initializeDeliveryOptions() {
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    const instructionsTextarea = document.getElementById('instructions');
    const charCountSpan = document.getElementById('charCount');
    const sameDayOption = document.getElementById('sameDayOption');
    
    // Update estimated delivery date based on shipping option
    function updateEstimatedDelivery() {
        const selectedShipping = document.querySelector('input[name="shipping"]:checked').value;
        const estimatedDateElement = document.getElementById('estimatedDeliveryDate');
        const today = new Date();
        let deliveryDate = new Date();

        switch(selectedShipping) {
            case 'sameday':
                if (today.getHours() < 14) { // Cut-off time for same-day delivery
                    deliveryDate = today;
                } else {
                    deliveryDate.setDate(today.getDate() + 1);
                }
                break;
            case 'express':
                deliveryDate.setDate(today.getDate() + 2);
                break;
            case 'standard':
                deliveryDate.setDate(today.getDate() + 5);
                break;
        }

        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        estimatedDateElement.textContent = deliveryDate.toLocaleDateString('en-US', options);
    }

    // Check if same-day delivery is available based on location and time
    function checkSameDayAvailability() {
        const currentHour = new Date().getHours();
        const eligibleCities = ['PH', 'SR', 'BTB']; // Phnom Penh, Siem Reap, Battambang
        const selectedCity = document.getElementById('city').value;

        if (currentHour >= 14 || !eligibleCities.includes(selectedCity)) {
            sameDayOption.style.display = 'none';
        } else {
            sameDayOption.style.display = 'block';
        }
    }

    // Character counter for delivery instructions
    if (instructionsTextarea) {
        instructionsTextarea.addEventListener('input', () => {
            const remaining = parseInt(instructionsTextarea.getAttribute('maxlength')) - 
                            instructionsTextarea.value.length;
            charCountSpan.textContent = remaining;
        });
    }

    // Event listeners
    shippingOptions.forEach(option => {
        option.addEventListener('change', () => {
            updateEstimatedDelivery();
            updateShippingCost();
        });
    });

    // Initialize
    updateEstimatedDelivery();
    checkSameDayAvailability();

    // Update same-day availability when city changes
    document.getElementById('city').addEventListener('change', checkSameDayAvailability);
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeDeliveryOptions();
});
