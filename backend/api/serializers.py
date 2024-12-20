from django.contrib.auth.models import User # we use Django's built-in User model data
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]  # Include 'email' here
        # password will be used on write operations (like creating a user) and will not be included in the serialized output (read operations).
        extra_kwargs = {"password": {"write_only" : True}} # later on, the displayed JSON user object will not include password
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user 
    
    
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note # tell the serializer which model (in this case, model Note) it should serialize/deserialize.
        fields = ["id", "title", "content", "last_modified", "author"]
        # `author` can be included in serialization outputs, but it cannot be set directly via the serializer during create or update operations through the API
        # because the `author` (actually the user) is automatically set based on the logged-in user
        extra_kwargs = {"author": {"read_only": True}}
    
        
        
        
