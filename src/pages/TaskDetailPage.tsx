import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodoContext } from '../contexts/TodoContext';
import { Todo, Comment } from '../types';
import CommentList from '../components/CommentList';
import AddCommentForm from '../components/AddCommentForm';
import * as api from '../utils/api';

const TaskDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { updateTodo, deleteTodo } = useTodoContext();
    const [todo, setTodo] = useState<Todo | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (id) {
            api.fetchTodo(parseInt(id)).then(setTodo);
            api.fetchComments(parseInt(id)).then(setComments);
        }
    }, [id]);

    if (!todo) return <div>Loading...</div>;

    const handleUpdate = async (updates: Partial<Todo>) => {
        const updatedTodo = await updateTodo(todo.id, updates);
        setTodo(updatedTodo);
    };

    const handleDelete = async () => {
        await deleteTodo(todo.id);
        navigate('/');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{todo.title}</h2>
            <p className="mb-4">{todo.content}</p>
            <div className="flex space-x-2 mb-4">
                <button onClick={() => handleUpdate({ completed: !todo.completed })} className={`px-4 py-2 rounded ${todo.completed ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>
                    {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </div>
            <h3 className="text-xl font-bold mb-2">Comments</h3>
            <CommentList comments={comments} setComments={setComments} todoId={todo.id} />
            <AddCommentForm todoId={todo.id} setComments={setComments} />
        </div>
    );
};

export default TaskDetailPage;