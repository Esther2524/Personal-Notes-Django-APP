import React from 'react';

function Note({ note, onDelete, onEdit }) {
    // const formattedDate = new Date(note.last_modified).toISOString();
    const date = new Date(note.last_modified);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    return (
        <div className="bg-gray-800 shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-2xl font-bold text-white">{note.title}<br /></h3>
            <h2 className='text-md'>{formattedDate}</h2>
            <p className="text-gray-300 break-words">{note.content}</p>

            <div className="flex justify-end space-x-2">
                <button onClick={() => onEdit(note)}
                    className="mt-3 mr-2 bg-[#608BC1] hover:bg-[#133E87] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition duration-300 ease-in-out">
                    Edit
                </button>

                <button onClick={() => onDelete(note.id)}
                    className="mt-3 bg-[#D76C82] hover:bg-[#B03052] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition duration-300 ease-in-out">
                    Delete
                </button>
            </div>
        </div>
    );
}


export default Note;
