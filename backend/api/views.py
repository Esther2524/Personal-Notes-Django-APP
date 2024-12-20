from django.shortcuts import render
from django.contrib.auth.models import User # build-in model
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note # custom model

# A view is a Python function or class that takes a web request and returns a web response

# Provide an API endpoint for user creation that is open to everyone.
# CreateAPIView is a generic view provided by DRF specifically designed to handle the creation of new instances of a model from POST requests.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    # This attribute tells the view which serializer to use for serializing and deserializing input and output data
    serializer_class = UserSerializer
    # AllowAny here means that any user, whether authenticated or not, can make requests to this view, 
    # which is typical for user registration endpoints where you don't require users to be logged in to create an account.
    permission_classes = [AllowAny]

"""
Use ListCreateAPIView to handle GET all notes and POST a new note
"""
class NoteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Filter notes so users see only their own notes
        return Note.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the owner to the current user
        serializer.save(author=self.request.user)

"""
Use RetrieveUpdateDestroyAPIView to handle GET (an indivisual note), PUT, and DELETE
"""      
class NoteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Ensure that users can only access their own notes
        return self.queryset.filter(author=self.request.user)