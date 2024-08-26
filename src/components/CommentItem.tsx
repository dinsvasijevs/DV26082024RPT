import React, { useState } from 'react';
import { Comment } from '../types';

interface Props {
    comment: Comment;
    onUpdate: (id: number, text: string) => void;
    onDelete: (id: number) => void;
}

const CommentItem: React.FC<Props> = ({ comment, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);

    const handleSave = () => {
        onUpdate(comment.id, editedText);
        setIsEditing(false);
    };

    return (
        <li className="bg-gray-100 p-3 rounded">
            {isEditing ? (
                <div>
          <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
              rows={3}
          />
                    <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded mr-2">Save</button>
                    <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
                </div>
            ) : (
                <div>
                    <p>{comment.text}</p>
                    <div className="mt-2">
                        <button onClick={() => setIsEditing(true)} className="text-blue-500 mr-2">Edit</button>
                        <button onClick={() => onDelete(comment.id)} className="text-red-500">Delete</button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default CommentItem;