import React from 'react';
import Note from './Note';

function NoteList({ notes, onDelete, onEdit }) {
    return (
        <div className='mt-10 mx-5'>
            <h1 className="text-2xl font-semibold text-gray-400 mb-4">Notes</h1>
            <div className="grid grid-cols-2 gap-4">
                {notes.map(note => (
                    <Note key={note.id} note={note} onDelete={onDelete} onEdit={onEdit} />
                ))}
            </div>
        </div>
    );
}


export default NoteList