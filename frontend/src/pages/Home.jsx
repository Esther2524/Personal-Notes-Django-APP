import React, { useEffect, useState } from 'react';
import api from '../api';
import NoteList from '../components/NoteList';
import NoteEditor from '../components/NoteEditor';

function Home() {
  const [notes, setNotes] = useState([]);
  const [mode, setMode] = useState(null); // 'edit', 'create', or null
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api.get("/api/notes/")
      .then((res) => setNotes(res.data))
      .catch((err) => alert('Failed to fetch notes: ', err));
  };

  const handleDeleteNote = (id) => {
    // Ask user for confirmation before deleting
    if (window.confirm("Are you sure you want to delete this note?")) {
      api.delete(`/api/notes/${id}`)
        .then((res) => {
          if (res.status === 204) {
            alert("Note deleted!");
            getNotes(); // Refresh the list of notes
          } else {
            alert("Failed to delete note.");
          }
        })
        .catch((error) => {
          alert(`Error deleting note: ${error}`);
          getNotes();
        });
    }
  };


  const handleSaveComplete = () => {
    getNotes();
    setMode(null);
    setCurrentNote(null);
  };

  const startEdit = (note) => {
    setMode('edit');
    setCurrentNote(note);
  };

  const startCreate = () => {
    setMode('create');
    setCurrentNote({ id: null, title: '', content: '' }); // empty note for creation
  };

  const cancelEdit = () => {
    setMode(null);
    setCurrentNote(null);
  };

  return (
    <div className="flex flex-col bg-black text-white min-h-screen p-10">
      <div className='mx-5'>
        {/* Dynamic title based on editing mode */}
        <h1 className="text-2xl font-semibold text-gray-400 mb-4">
          {mode === 'edit' ? 'Edit this Note!' : 'Create a New Note!'}
        </h1>

        {/* Show create button only if not in any mode */}
        {mode === null && (
          <button onClick={startCreate} className="mb-4 bg-[#FFAF00] hover:bg-[#FF8225] text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300 ease-in-out">
            Create Note
          </button>
        )}
      </div>


      {(mode === 'edit' || mode === 'create') && (
        <NoteEditor
          note={currentNote}
          isEditing={mode === 'edit'}
          onSave={handleSaveComplete}
          onCancel={cancelEdit}
        />
      )}

      {mode === null && (
        <NoteList notes={notes} onDelete={handleDeleteNote} onEdit={startEdit} />
      )}
    </div>
  );
}

export default Home;
