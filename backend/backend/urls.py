from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Standard route for Django’s admin panel, which provides a web-based interface to manage database entries.
    path('admin/', admin.site.urls),
    
    # Having a specific path for user registration, we isolate user management functionalitie
    # Set up an endpoint for user registration. CreateUserView from view.py should handle the logic for creating new user accounts.
    path('api/users/register/', CreateUserView.as_view(), name="register"),
    
    # JWT Authentication endpoints (TokenObtainPairView and TokenRefreshView are built-in classes)
    path('api/token/', TokenObtainPairView.as_view(), name="get_token"), # Obtain a pair of access and refresh JSON web tokens for authenticated users.
    path('api/token/refresh/', TokenRefreshView.as_view(), name="refresh_token"), # Obtain a new access token using the refresh token when the current access token has expired.
    
    # Django REST Framework's login and logout views for browsable API (also built-in)
    # Include a set of URLs provided by DRF for things like logging in and out of the browsable API interface.
    path('api-auth', include("rest_framework.urls")),
    
    # if we include a set of URLs from `api/urls.py` file, Django will forward any requests that match the specified path prefix to the included URL configuration.
    path('api/', include("api.urls")),
]
