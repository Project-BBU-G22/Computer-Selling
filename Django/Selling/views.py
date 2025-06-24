from django.shortcuts import render, redirect, get_object_or_404
from .models import Product, Category, Cart, Order, OrderItem
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import SignUpForm 
from django.contrib.auth.decorators import user_passes_test, login_required, permission_required
from django.contrib.admin.views.decorators import staff_member_required
from django.core.paginator import Paginator
from django.http import HttpResponseForbidden
from django.core.exceptions import PermissionDenied
from django.db import transaction



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

@user_passes_test(lambda u: u.is_authenticated and u.is_staff)
def workspace_view(request):
    # All staff users can access the workspace
    products = Product.objects.all()
    categories = Category.objects.all()
    orders = Order.objects.all().order_by('-created_at')
      # Calculate total amount of all orders
    from django.db.models import Sum
    from django.db.models.functions import Extract
    from datetime import datetime, timedelta
    import calendar
    import json
    
    # Calculate total amount only for delivered orders
    delivered_orders = orders.filter(status='delivered')
    total_orders_amount = delivered_orders.aggregate(Sum('total_amount'))['total_amount__sum'] or 0
    
    # Get monthly revenue data for the last 12 months
    current_date = datetime.now()
    monthly_revenue = []
    month_labels = []
    
    for i in range(11, -1, -1):  # Last 12 months
        target_date = current_date - timedelta(days=30 * i)
        month_orders = orders.filter(
            created_at__year=target_date.year,
            created_at__month=target_date.month,
            status='delivered'  # Only count delivered orders for revenue
        )
        month_total = month_orders.aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        monthly_revenue.append(float(month_total))
        month_labels.append(calendar.month_abbr[target_date.month])
    
    # Convert to JSON for JavaScript
    monthly_revenue_json = json.dumps(monthly_revenue)
    month_labels_json = json.dumps(month_labels)
    
    # Pagination for products
    paginator = Paginator(products, 12)  # Show 12 products per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
      # Pagination for orders
    order_paginator = Paginator(orders, 10)  # Show 10 orders per page
    order_page_number = request.GET.get('order_page')
    order_page_obj = order_paginator.get_page(order_page_number)
    
    return render(request, 'workspace.html', {
        'Products': page_obj,
        'Categories': categories,
        'Orders': order_page_obj,
        'page_obj': page_obj,
        'order_page_obj': order_page_obj,
        'total_orders_amount': total_orders_amount,
        'monthly_revenue_json': monthly_revenue_json,
        'month_labels_json': month_labels_json,
    })

@permission_required('Selling.add_category', raise_exception=True)
def add_category(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        if name:
            Category.objects.create(name=name)
            messages.success(request, f'Category "{name}" has been added successfully!')
        else:
            messages.error(request, 'Category name is required!')
    return redirect('workspace')

@user_passes_test(lambda u: u.is_authenticated and u.is_staff)
def add_product(request):
    try:
        if request.method == 'POST':
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
    except PermissionDenied:
        return render(request, 'permission_denied_popup.html', {
            'message': "You don't have permission to add products."
        })
    except Exception as e:
        messages.error(request, f'Error adding product: {str(e)}')
    return redirect('workspace')

@permission_required('Selling.delete_category', raise_exception=True)
def delete_category(request, category_id):
    try:
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
    except PermissionDenied:
        return render(request, 'permission_denied_popup.html', {
            'message': "You don't have permission to delete categories."
        })
    except Exception as e:
        messages.error(request, f'Error deleting category: {str(e)}')
    return redirect('workspace')

@user_passes_test(lambda u: u.is_authenticated and u.is_staff)
def delete_product(request, product_id):
    try:
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
    except PermissionDenied:
        return render(request, 'permission_denied_popup.html', {
            'message': "You don't have permission to delete products."
        })
    except Exception as e:
        messages.error(request, f'Error deleting product: {str(e)}')
    return redirect('workspace')

@user_passes_test(lambda u: u.is_authenticated and u.is_staff)
def edit_product(request, product_id):
    try:
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
    except PermissionDenied:
        return render(request, 'permission_denied_popup.html', {
            'message': "You don't have permission to edit products."
        })
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
    if not cart_items:
        messages.error(request, "Your cart is empty")
        return redirect('view_cart')
    
    total_price = sum(item.get_total_price() for item in cart_items)

    if request.method == 'POST':
        try:
            with transaction.atomic():
                # Get form data
                customer_name = request.POST.get('name')
                customer_email = request.POST.get('email')
                customer_phone = request.POST.get('phone')
                delivery_option = request.POST.get('delivery_option')
                province = request.POST.get('province') if delivery_option == 'delivery' else None
                payment_method = request.POST.get('payment_method')
                
                # Get payment details for Visa
                card_number = request.POST.get('card_number', '')
                card_last_four = card_number.replace(' ', '')[-4:] if card_number else None
                
                # Validate required fields
                required_fields = [customer_name, customer_email, customer_phone, delivery_option, payment_method]
                if delivery_option == 'delivery':
                    required_fields.append(province)
                
                if not all(required_fields):
                    messages.error(request, 'Please fill in all required fields')
                    return render(request, 'checkout.html', {
                        'cart_items': cart_items,
                        'total_price': total_price
                    })
                
                # Create the order
                order = Order.objects.create(
                    user=request.user,
                    customer_name=customer_name,
                    customer_email=customer_email,
                    customer_phone=customer_phone,
                    delivery_option=delivery_option,
                    province=province,
                    payment_method=payment_method,
                    card_last_four=card_last_four,
                    total_amount=total_price,
                    status='pending'
                )
                
                # Create order items from cart
                for cart_item in cart_items:
                    OrderItem.objects.create(
                        order=order,
                        product=cart_item.product,
                        quantity=cart_item.quantity,
                        price=cart_item.product.price  # Store current price
                    )
                
                # Clear the cart after successful order creation
                cart_items.delete()
                
                # Success message with order details
                messages.success(request, 
                    f'Order #{order.order_number} placed successfully! '
                    f'Total: ${order.total_amount}. '
                    f'You will receive confirmation details at {customer_email}.')
                
                return redirect('order_success', order_id=order.id)
                
        except Exception as e:
            messages.error(request, f'Error processing your order: {str(e)}')
            return render(request, 'checkout.html', {
                'cart_items': cart_items,
                'total_price': total_price
            })

    return render(request, 'checkout.html', {
        'cart_items': cart_items,
        'total_price': total_price
    })

def order_success(request, order_id):
    if not request.user.is_authenticated:
        return redirect('login')
    
    order = get_object_or_404(Order, id=order_id, user=request.user)
    return render(request, 'order_success.html', {'order': order})

def order_history(request):
    if not request.user.is_authenticated:
        messages.error(request, "Please login to view your orders")
        return redirect('login')
    
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'order_history.html', {'orders': orders})

def order_detail(request, order_id):
    if not request.user.is_authenticated:
        return redirect('login')
    
    order = get_object_or_404(Order, id=order_id, user=request.user)
    return render(request, 'order_detail.html', {'order': order})

@staff_member_required
def update_order_status(request, order_id):
    """
    Update order status - only staff members can perform this action
    """
    if not request.user.is_staff:
        messages.error(request, 'Access denied. Staff privileges required.')
        return redirect('home')
    
    if request.method == 'POST':
        try:
            order = get_object_or_404(Order, id=order_id)
            new_status = request.POST.get('status')
            
            # Validate the new status
            if new_status not in [choice[0] for choice in Order.STATUS_CHOICES]:
                messages.error(request, 'Invalid status selected')
                return redirect('workspace')
            
            # Store old status for logging
            old_status = order.get_status_display()
            
            # Update the order status
            order.status = new_status
            order.save()
            
            # Success message with detailed info
            messages.success(
                request, 
                f'Order #{order.order_number} status updated to "{order.get_status_display()}"'
            )
            
            # Log the status change (optional - for audit trail)
            print(f"Staff {request.user.username} updated order #{order.order_number} status from {old_status} to {order.get_status_display()}")
                
        except Order.DoesNotExist:
            messages.error(request, 'Order not found')
        except Exception as e:
            messages.error(request, f'Error updating order status: {str(e)}')
    else:
        messages.error(request, 'Invalid request method')
    
    return redirect('workspace')