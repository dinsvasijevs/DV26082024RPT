import React, { useState } from 'react';
import { useTodoContext } from '../contexts/TodoContext';

const AddTodoForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { addTodo } = useTodoContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            await addTodo({ title, content, completed: false });
            setTitle('');
            setContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Todo title"
                className="w-full p-2 mb-2 border rounded"
                required
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Todo content (optional)"
                className="w-full p-2 mb-2 border rounded"
                rows={3}
            />
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add Todo
            </button>
        </form>
    );
};

export default AddTodoForm;