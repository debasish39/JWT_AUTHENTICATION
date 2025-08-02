from django.urls import path
from account.views import (
    user_registration,
    user_login,
    user_profile,
    user_change_password,
    send_password_reset_email,
    user_password_reset
)

urlpatterns = [
    path('register/', user_registration, name='register'),
    path('login/', user_login, name='login'),
    path('profile/', user_profile, name='profile'),
    path('changepassword/', user_change_password, name='changepassword'),
    path('send-reset-password-email/', send_password_reset_email, name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', user_password_reset, name='reset-password'),
]