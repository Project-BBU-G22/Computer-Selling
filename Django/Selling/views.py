from django.shortcuts import render
from .models import Product, Category

# Home page view
def index(request):
    # Fetch all products and categories from the database
    products = Product.objects.all()
    categories = Category.objects.all()
    return render(request, 'home.html', {'Products': products, 'Categories': categories})

# About page view
def about(request):
    return render(request, 'about.html')