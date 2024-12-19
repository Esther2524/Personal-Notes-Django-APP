import React from 'react';

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
            <p className="text-gray-600">{note.content}</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
            <button onClick={() => onDelete(note.id)}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Delete
            </button>
        </div>
    );
}

export default Note;
