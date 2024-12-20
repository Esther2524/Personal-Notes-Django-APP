# Personal Notes Application

## Built With
* **Django** - The web framework used for the backend.
* **Django REST Framework** - The framework used for creating APIs.
* **React** - The web library used for the frontend.
* **Databases**:
    * **SQLite** - Used during development for its simplicity and ease of configuration.
    * **PostgreSQL** - Recommended for production due to its robustness, scalability, and support for advanced features.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
What things you need to install the software and how to install them:
- Python 3.8+
- pip
- Node.js
- npm or yarn

### Backend Setup
Navigate to the backend directory:
```
cd backend
```
Create and activate a virtual environment:
```
python -m venv venv
source venv/bin/activate
```
Install the required packages:
```
pip install -r requirements.txt
```
Migrate the database:
```
python manage.py makemigrations
python manage.py migrate
```
Start the Django development server:
```
python manage.py runserver
```
### Frontend Setup
Navigate to the frontend directory:
```
cd frontend
```
Environment Configuration: you need to set up an environment file. Create a `.env` file in the `frontend` directory and add the following line:
```
REACT_APP_BASE_API_URL="http://127.0.0.1:8000"
```

Install the necessary npm packages:
```
npm install
```
Start the React development server:
```
npm start
```
### Database Setup
If you use the default SQLite database, you don't need to change the default settings. If you want to switch to the PostgreSQL database, modify the code in `settings.py`:

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'your_database_name',
        'USER': 'your_database_user',
        'PASSWORD': 'your_database_password',
        'HOST': 'localhost',
        'PORT': '', 
    }
}
```


## Project Details
### API Endpoints
* **User Authentication**
  * POST `/api/token/`: Retrieve the JWT authentication token using username and password.
  * POST `/api/token/refresh/`: Retrieve a new access token using a refresh token.
* **Notes CRUD**
  * GET `/api/notes/`: List all notes for the authenticated user.
  * POST `/api/notes/`: Create a new note.
  * GET `/api/notes/{id}/`: Retrieve a specific note.
  * PUT `/api/notes/{id}/`: Update a specific note.
  * DELETE `/api/notes/{id}/`: Delete a specific note.

### Features
This application offers a variety of features to enhance user interaction and data management:
- **Display Notes**: Users can view a list of all their notes along with their titles, content and the timestamps of their last modifications.
- **Add New Notes**: Provides a form to create new notes, which are immediately available in the list after creation.
- **Edit Existing Notes**: Users can select any note to edit its content or title, with changes reflected immediately.
- **Delete Notes**: Notes can be deleted with an additional confirmation step to prevent accidental deletions.

These features are designed to provide a seamless note-taking experience, ensuring data is easy to manage and always accessible.
