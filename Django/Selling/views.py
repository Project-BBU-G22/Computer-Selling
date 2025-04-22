from django.shortcuts import render, redirect
from .models import Product, Category
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

# Home page view
def home(request):
    # Fetch all products and categories from the database
    products = Product.objects.all()
    categories = Category.objects.all()
    return render(request, 'home.html', {'Products': products, 'Categories': categories})

# About page view
def about(request):
    return render(request, 'about.html')

# User page view
def login_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, ("You have been logged in successfully."))
            # Redirect to home page after login
            return redirect('home')
        else:
            messages.success(request, ("Invalid username or password."))
            # Corrected redirect to the login page
            return redirect('login')
    else:
        return render(request, 'login.html')

# Logout page view
def logout_user(request):
    logout(request)
    messages.success(request, ("You have been logged out successfully."))
    # Redirect to home page after logout
    return redirect('home')

# Category page view
def category(request, foo):
    # Fetch products based on the selected category
    products = Product.objects.filter(category__name=foo)
    categories = Category.objects.all()
    return render(request, 'category.html', {
        'Products': products,
        'Categories': categories,
        'category': foo,  # Pass the selected category name
    })
