from django.shortcuts import render
from .models import Product, Category

# Create your views here.
def index(request):
    Products = Product.objects.all()
    Categories = Category.objects.all()
    return render(request, 'home.html', {'Products': Products, 'Categories': Categories})

