from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreateAPIView.as_view(), name="note-create-and-retrieve"),
    path("notes/<int:pk>", views.NoteDetailAPIView.as_view(), name="node-update-and-delete"),
]
