from django.shortcuts import render, redirect, get_object_or_404
from .models import Product, Category, Cart
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import SignUpForm 
from django.contrib.auth.decorators import user_passes_test, login_required
from django.core.paginator import Paginator
from django.http import HttpResponseForbidden



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
            messages.success(request, ("You have been logged in successfully..."))
            # Redirect to home page after login
            return redirect('home')
        else:
            messages.error(request, ("Invalid username or password"))
            # Corrected redirect to the login page
            return redirect('login')
    else:
        return render(request, 'login.html')

# Logout page view
def logout_user(request):
    logout(request)
    messages.success(request, ("You have been logged out successfully..."))
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

# Register page view
def register_user(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save() # Save the user using the overridden save method
            login(request, user) # Optional: Log the user in immediately after signup
            return redirect('home') # Redirect to a success page (e.g., home)
    else:
        form = SignUpForm() # Create an empty form for GET requests
    return render(request, 'register.html', {'form': form})

@login_required
def workspace_view(request):
    # Check if user has permission to edit workspace
    if request.user.has_perm('Selling.edit_workspace'):
        # Original workspace view logic here
        products = Product.objects.all()
        categories = Category.objects.all()
        
        # Pagination
        paginator = Paginator(products, 12)  # Show 12 products per page
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        
        return render(request, 'workspace.html', {
            'Products': page_obj,
            'Categories': categories,
            'page_obj': page_obj,
        })
    else:
        # User doesn't have permission
        return render(request, 'permission_denied.html', {
            'message': "You don't have permission to access this workspace."
        })

def is_staff(user):
    return user.is_authenticated and user.is_staff

@user_passes_test(is_staff)
def add_category(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        if name:
            Category.objects.create(name=name)
            messages.success(request, f'Category "{name}" has been added successfully!')
        else:
            messages.error(request, 'Category name is required!')
    return redirect('workspace')

@user_passes_test(is_staff)
def add_product(request):
    if request.method == 'POST':
        try:
            name = request.POST.get('name')
            category_id = request.POST.get('category')
            price = request.POST.get('price')
            description = request.POST.get('description')
            image = request.FILES.get('image')

            if all([name, category_id, price, description, image]):
                category = Category.objects.get(id=category_id)
                Product.objects.create(
                    name=name,
                    category=category,
                    price=price,
                    description=description,
                    image=image
                )
                messages.success(request, f'Product "{name}" has been added successfully!')
            else:
                messages.error(request, 'All fields are required!')
        except Exception as e:
            messages.error(request, f'Error adding product: {str(e)}')
    return redirect('workspace')

@user_passes_test(is_staff)
def delete_category(request, category_id):
    if request.method == 'POST':
        try:
            category = Category.objects.get(id=category_id)
            category_name = category.name
            category.delete()
            messages.success(request, f'Category "{category_name}" has been deleted successfully!')
        except Category.DoesNotExist:
            messages.error(request, 'Category not found!')
        except Exception as e:
            messages.error(request, f'Error deleting category: {str(e)}')
    return redirect('workspace')

@user_passes_test(is_staff)
def delete_product(request, product_id):
    if request.method == 'POST':
        try:
            product = Product.objects.get(id=product_id)
            product_name = product.name
            product.delete()
            messages.success(request, f'Product "{product_name}" has been deleted successfully!')
        except Product.DoesNotExist:
            messages.error(request, 'Product not found!')
        except Exception as e:
            messages.error(request, f'Error deleting product: {str(e)}')
    return redirect('workspace')

@user_passes_test(is_staff)
def edit_product(request, product_id):
    if request.method == 'POST':
        try:
            product = Product.objects.get(id=product_id)
            product.name = request.POST.get('name')
            category_id = request.POST.get('category')
            product.category = Category.objects.get(id=category_id)
            product.price = request.POST.get('price')
            product.description = request.POST.get('description')
            
            # Handle image update if a new image is provided
            new_image = request.FILES.get('image')
            if new_image:
                product.image = new_image
            
            product.save()
            messages.success(request, f'Product "{product.name}" has been updated successfully!')
        except Product.DoesNotExist:
            messages.error(request, 'Product not found!')
        except Category.DoesNotExist:
            messages.error(request, 'Category not found!')
        except Exception as e:
            messages.error(request, f'Error updating product: {str(e)}')
    return redirect('workspace')

def add_to_cart(request, product_id):
    if not request.user.is_authenticated:
        messages.error(request, "Please login to add items to cart")
        return redirect('login')
    
    product = get_object_or_404(Product, id=product_id)
    cart_item, created = Cart.objects.get_or_create(
        user=request.user,
        product=product,
        defaults={'quantity': 1}
    )
    
    if not created:
        cart_item.quantity += 1
        cart_item.save()
    
    messages.success(request, f"{product.name} added to cart")
    return redirect(request.META.get('HTTP_REFERER', 'home'))

def view_cart(request):
    if not request.user.is_authenticated:
        messages.error(request, "Please login to view your cart")
        return redirect('login')
    
    cart_items = Cart.objects.filter(user=request.user)
    total_price = sum(item.get_total_price() for item in cart_items)
    
    return render(request, 'cart.html', {
        'cart_items': cart_items,
        'total_price': total_price
    })

def update_cart(request, cart_id):
    if not request.user.is_authenticated:
        return redirect('login')
    
    cart_item = get_object_or_404(Cart, id=cart_id, user=request.user)
    quantity = int(request.POST.get('quantity', 1))
    
    if quantity > 0:
        cart_item.quantity = quantity
        cart_item.save()
    else:
        cart_item.delete()
    
    return redirect('view_cart')

def remove_from_cart(request, cart_id):
    if not request.user.is_authenticated:
        return redirect('login')
    
    cart_item = get_object_or_404(Cart, id=cart_id, user=request.user)
    cart_item.delete()
    messages.success(request, "Item removed from cart")
    return redirect('view_cart')

def checkout(request):
    if not request.user.is_authenticated:
        messages.error(request, "Please login to proceed to checkout")
        return redirect('login')

    cart_items = Cart.objects.filter(user=request.user)
    total_price = sum(item.get_total_price() for item in cart_items)

    if request.method == 'POST':
        name = request.POST.get('name')
        address = request.POST.get('address')
        phone = request.POST.get('phone')
        # Here you would create an Order and clear the cart, etc.
        # For now, just show a success message and redirect to home
        messages.success(request, 'Order placed successfully!')
        cart_items.delete()
        return redirect('home')

    return render(request, 'checkout.html', {
        'cart_items': cart_items,
        'total_price': total_price
    })