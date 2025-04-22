from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django import forms

class SignUpForm(UserCreationForm):
    """
    A custom form for user registration (sign up) with required email,
    first name, and last name, styled for Bootstrap.
    """
    email = forms.EmailField(
        max_length=254,
        required=True,
    )
    first_name = forms.CharField(
        max_length=150,
        required=True,
    )
    last_name = forms.CharField(
        max_length=150,
        required=True,
    )

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Apply Bootstrap classes and placeholders to all fields
        for field_name, field in self.fields.items():
            field.widget.attrs.update({
                'class': 'form-control',
                'placeholder': field.label
            })
            # Show errors using Bootstrap's invalid feedback
            field.error_messages = {'required': f'{field.label} is required.'}

    def save(self, commit=True):
        user = super().save(commit=False)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user