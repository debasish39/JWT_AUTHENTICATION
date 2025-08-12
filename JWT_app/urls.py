
from django.contrib import admin
from django.urls import path, include
from account import views
from contact import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('account.urls')),
    path('api/',include('contact.urls'))
]
