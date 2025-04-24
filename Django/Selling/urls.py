from django.urls import path
from . import views
from django.contrib import admin

urlpatterns = [
    path('', views.home, name='home'),
    path('workspace/', views.workspace, name='workspace'),
    path('about/', views.about, name='about'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('register/', views.register_user, name='register'),
    path('category/<str:foo>', views.category, name='category'),
    path('add-product/', views.add_product, name='add_product'),
    path('add-category/', views.add_category, name='add_category'),
    path('delete-product/<int:product_id>/', views.delete_product, name='delete_product'),
    path('delete-category/<int:category_id>/', views.delete_category, name='delete_category'),
]
