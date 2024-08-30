import React, {useState} from 'react';
import {useTodoContext} from '../contexts/TodoContext';
import {Comment} from '../types';

interface Props {
    todoId: number;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const AddCommentForm: React.FC<Props> = ({todoId, setComments}) => {
    const [text, setText] = useState('');
    const {addComment} = useTodoContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            const newComment = await addComment({todoId, text});
            setComments(prev => [...prev, newComment]);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
      <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment"
          className="w-full p-2 mb-2 border rounded"
          rows={3}
          required
      />
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add Comment
            </button>
        </form>
    );
};

export default AddCommentForm;