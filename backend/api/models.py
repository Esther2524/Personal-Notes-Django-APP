from django.db import models
from django.contrib.auth.models import User

# Create custom models in this file

# (models.Model) is the inheritance that makes Node model a Django model 
class Note(models.Model):
    title = models.CharField(max_length=100) # the title can be up to 100 characters long
    content = models.TextField() # larger blocks of text that don't have a specific length limit
    created_at = models.DateTimeField(auto_now_add=True) # automatically set the field to the date and time when a note is first created
    
    # `author` field establishes a foreign key relationship to the Django built-in User model.
    # `models.CASCADE means that when a user is deleted, all of their associated notes should also be deleted. 
    # `related_name="notes"`: we can access the notes of a user using user.notes.all() where user is an instance of the User model. 
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    
    def __str__(self):
        return self.title
