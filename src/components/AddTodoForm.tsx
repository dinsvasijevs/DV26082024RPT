import React, {useState} from 'react';
import {useTodoContext} from '../contexts/TodoContext';

const AddTodoForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);
    const {addTodo} = useTodoContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (title.trim().length === 0) {
            setError("Title cannot be empty");
            return;
        }

        try {
            await addTodo({title: title.trim(), content: content.trim(), completed: false});
            setTitle('');
            setContent('');
        } catch (err) {
            console.error("Error adding todo:", err);
            setError(`Failed to add todo. Please try again.`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Todo title"
                className="w-full p-2 mb-2 border rounded"
                maxLength={100}
                required
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Todo content (optional)"
                className="w-full p-2 mb-2 border rounded"
                rows={3}
                maxLength={1000}
            />
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add Todo
            </button>
        </form>
    );
};

export default AddTodoForm;