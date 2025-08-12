from django.shortcuts import render
from .models import Contact
from .serializers import ContactSerializer
from rest_framework import generics,permissions
# Create your views here.
class ContactView(generics.CreateAPIView):
    serializer_class=ContactSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    def perform_create(self,serializer):
        serializer.save()