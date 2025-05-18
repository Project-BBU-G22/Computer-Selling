from django.urls import path
from . import views
from django.contrib import admin

urlpatterns = [
    path('', views.home, name='home'),
    path('workspace/', views.workspace_view, name='workspace'),
    path('about/', views.about, name='about'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('register/', views.register_user, name='register'),
    path('category/<str:foo>', views.category, name='category'),
    path('add-product/', views.add_product, name='add_product'),
    path('add-category/', views.add_category, name='add_category'),
    path('delete-product/<int:product_id>/', views.delete_product, name='delete_product'),
    path('delete-category/<int:category_id>/', views.delete_category, name='delete_category'),
    path('edit-product/<int:product_id>/', views.edit_product, name='edit_product'),
    path('add-to-cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/', views.view_cart, name='view_cart'),
    path('update-cart/<int:cart_id>/', views.update_cart, name='update_cart'),
    path('remove-from-cart/<int:cart_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('checkout/', views.checkout, name='checkout'),
]
