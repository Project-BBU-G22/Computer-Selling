from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages


# Create your views here.
def login_user(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, "Login successful!")
            return redirect('index')  # Redirect to the index page or another success page
        else:
            messages.error(request, "Invalid username or password.")
            return redirect('login')  # Redirect back to the login page
    else:
        return render(request, 'login.html')  # Render the login page for GET requests

def index(request):
    return render(request, 'index.html')

