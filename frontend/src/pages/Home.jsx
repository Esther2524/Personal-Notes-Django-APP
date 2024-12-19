import React, { useEffect, useState } from 'react';
import api from '../api';
import Note from '../components/Note';

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  /*
   * This useEffect calls the getNotes function when the Home component mounts. 
   * The empty dependency array ([]) ensures that the function is called only once after the initial render.
   * 
   * If we don't have this useEffect, the getNotes function would be called not just on the initial mount but on every re-render of the component. 
   * Since setNotes updates the component's state, it triggers a re-render, which in turn would call getNotes again, leading to an infinite loop.
  */
  useEffect(() => {
    getNotes();
  }, [])

  const getNotes = () => {
    api.get("/api/notes/") // api call
      .then((res) => res.data) // Promise Handling: Extracts the data from the response.
      .then((data) => setNotes(data)) // Promise Handling: Updates the notes state with the fetched data.
      .catch((err) => alert(err)) // Promise Handling: Catches any errors that occur during the API request or data handling 
  };

  const deleteNote = (id) => {
    api.delete(`api/notes/delete/${id}`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted!");
          getNotes();  // Only refresh notes list if delete was successful
        } else {
          alert("Failed to delete note.");
        }
      })
      .catch((error) => {
        alert(error);
        getNotes();  // Optionally, refresh notes even if there's an error to ensure UI consistency
      });
  }



  const createNote = (e) => {
    e.preventDefault()
    api.post("/api/notes/", { content, title }) // {content, title} is the payload (a JSON object) of the POST request
      .then((res) => {
        if (res.status === 201) {
          alert("Note created!")
          getNotes(); // Refresh notes list only after successful creation
        } else {
          alert("Failed to create a note!")
        }
      })
      .catch((err) => alert(err))
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Notes</h1>
      {notes.map((note) => (
        <Note note={note} onDelete={deleteNote} key={note.id} />
      ))}

      <br />
      <h1 className='text-2xl font-semibold'>Create a New Note</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form onSubmit={createNote} className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <label htmlFor='title' className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type='text'
              id='title'
              name='title'
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="mb-6">
            <label htmlFor='content' className="block text-gray-700 text-sm font-bold mb-2">Content</label>
            <textarea
              id='content'
              name='content'
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
          </div>

          {/* act as a button that, when clicked, will submit the form (trigger onSubmit) in which it is contained.  */}
          <input type='submit' value='Submit' className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
        </form>
      </div>


    </div>
  )
}

export default Home