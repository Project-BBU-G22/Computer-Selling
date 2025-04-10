from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('authentication/', views.login_user, name='login'),
    ]
