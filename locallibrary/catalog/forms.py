from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.utils.safestring import mark_safe

SECURITY_QUESTIONS = [
    ('birthday_party', 'In what city did you have your first ever birthday party?'),
    ('science_teacher', 'What is the last name of your Science class teacher in high school?'),
    ('mobile_phone', 'Which company manufactured your first mobile phone?'),
    ('childhood_hero', 'Who was your childhood hero?'),
    ('family_vacation', 'Where was your best family vacation?')
]

class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    last_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    email = forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.')
    id_number = forms.IntegerField(max_value=99999999)
    question = forms.CharField(label='Select one security question to answer', 
    widget = forms.Select(choices=SECURITY_QUESTIONS))
    answer = forms.CharField(max_length=50, help_text = "Place your answer here (Max: 50 characters):")

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'id_number', 'password1', 'password2', 'question', 'answer')