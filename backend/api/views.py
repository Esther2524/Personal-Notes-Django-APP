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
NoteListCreate is a class-based view designed to handle both GET requests (to list all resources) 
and POST requests (to create a new resource) for the Note model.

It extends Django REST Framework's ListCreateAPIView that handles both listing a set of resources and creating a new resource.
DRF will send this serialized data back to the client as a JSON response.
"""
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer # specify the serializer
    
    # Configure the view to allow access only to authenticated users. 
    permission_classes = [IsAuthenticated] # so you have to be an authenticated user first, and then you have the permission to add notes
    
    # Get request: return all the notes of the current user. (users can only see their own notes)
    # get_queryset is a built-in method and we need to override it here
    def get_queryset(self):
        user = self.request.user # this retrieves the User object of the currently authenticated user making the request.
        return Note.objects.filter(author=user) # This line fetches only those Note instances where the author field matches the currently authenticated user. 
    
    # Post request: create a new Note instance
    def perform_create(self, serializer):
        # Before saving the data, the serializer checks if the incoming data is valid according to the rules defined in NoteSerializer
        # This includes checking required fields, correct formats, and any other constraints.
        if serializer.is_valid():
            # Save the new Note object to the database with the author field set to the currently authenticated user
            # Note what gets stored in the database are the Django model objects, not the serializers. 
            # This step is the deserialization process
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            
"""
NoteDelete extends Django REST Framework's DestroyAPIView that is designed specifically to handle DELETE requests to delete a resource (in this case, a Note object).
This view is configured to ensure that only authenticated users can delete notes, 
and more specifically, users can only delete notes that they own.
"""
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] # make sure this view can only be accessed by authenticated users. 
    
    def get_queryset(self):
        user = self.request.user # fetch the User object from the current user's query
        return Note.objects.filter(author=user) # filter the Note queryset to include only those notes where the author matches the logged-in user. 
    
