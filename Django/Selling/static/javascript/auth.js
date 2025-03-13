document.addEventListener('DOMContentLoaded', () => {
    initializeAuth();
});

function initializeAuth() {
    const loginToggle = document.getElementById('login-toggle');
    const registerToggle = document.getElementById('register-toggle');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Toggle between login and register forms
    loginToggle.addEventListener('click', () => {
        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        loginForm.classList.add('fade-in');
    });

    registerToggle.addEventListener('click', () => {
        registerToggle.classList.add('active');
        loginToggle.classList.remove('active');
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
        registerForm.classList.add('fade-in');
    });

    // Password visibility toggle
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const input = e.target.previousElementSibling;
            const type = input.getAttribute('type');
            input.setAttribute('type', type === 'password' ? 'text' : 'password');
            e.target.classList.toggle('fa-eye');
            e.target.classList.toggle('fa-eye-slash');
        });
    });

    // Password strength meter
    const passwordInput = document.getElementById('register-password');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');

    passwordInput.addEventListener('input', () => {
        const strength = checkPasswordStrength(passwordInput.value);
        updatePasswordStrength(strength, strengthMeter, strengthText);
    });

    // Form submissions
    document.getElementById('login-form-element').addEventListener('submit', handleLogin);
    document.getElementById('register-form-element').addEventListener('submit', handleRegister);
}

function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[!@#$%^&*]+/)) strength++;

    return strength;
}

function updatePasswordStrength(strength, meter, text) {
    const width = (strength / 5) * 100;
    let color = '#ef4444';
    let message = 'Weak';

    if (strength >= 2) {
        color = '#f59e0b';
        message = 'Fair';
    }
    if (strength >= 3) {
        color = '#10b981';
        message = 'Good';
    }
    if (strength >= 4) {
        color = '#059669';
        message = 'Strong';
    }

    meter.style.width = `${width}%`;
    meter.style.background = color;
    text.textContent = message;
    text.style.color = color;
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const remember = document.getElementById('remember-me').checked;

    // Add your login logic here
    console.log('Login attempt:', { email, password, remember });
    
    // Show success notification
    showNotification('Login successful!', 'success');
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const acceptTerms = document.getElementById('accept-terms').checked;

    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }

    if (!acceptTerms) {
        showNotification('Please accept the Terms of Service', 'error');
        return;
    }

    // Add your registration logic here
    console.log('Registration attempt:', { name, email, password, acceptTerms });
    
    // Show success notification
    showNotification('Registration successful!', 'success');
}

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