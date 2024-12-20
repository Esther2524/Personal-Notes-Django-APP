import React, { useState, useEffect } from 'react';
import api from '../api';

function NoteEditor({ note, isEditing, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  console.log("isEditing:", isEditing);

  // Effect to pre-fill form when editing an existing note
  useEffect(() => {
    if (isEditing && note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteData = { title, content };
  
    // Determine the HTTP method and URL based on editing state
    const apiUrl = note && isEditing ? `/api/notes/${note.id}` : "/api/notes/";
    const method = isEditing ? 'put' : 'post';
  
    api[method](apiUrl, noteData)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          alert(`Note ${isEditing ? 'updated' : 'created'}!`);
          onSave();
        } else {
          alert(`Failed to ${isEditing ? 'update' : 'create'} the note.`);
        }
      })
      .catch((err) => {
        alert(`Error ${isEditing ? 'updating' : 'creating'} the note: ${err}`);
      });
  };

  return (
    <div className="bg-gray-800 shadow-md mx-auto mt-10 rounded-lg p-4 w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label htmlFor='title' className="block text-white text-lg font-bold mb-2">Title</label>
          <input
            type='text'
            id='title'
            name='title'
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor='content' className="block text-white text-lg font-bold mb-2">Content</label>
          <textarea
            id='content'
            name='content'
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-between">
          <input type='submit' value={isEditing ? 'Update Note' : 'Create Note'} className="bg-[#608BC1] hover:bg-[#133E87] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out" />
          <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteEditor;
