import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useTodoContext} from '../contexts/TodoContext';
import {Comment, Todo} from '../types';
import CommentList from '../components/CommentList';
import AddCommentForm from '../components/AddCommentForm';
import * as api from '../utils/api';

const TaskDetailPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {updateTodo, deleteTodo} = useTodoContext();
    const [todo, setTodo] = useState<Todo | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setError("No todo ID provided");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                const [todoData, commentsData] = await Promise.all([
                    api.fetchTodo(id),
                    api.fetchComments(id)
                ]);
                setTodo(todoData);
                setComments(commentsData);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(`Failed to load todo. Error: ${err instanceof Error ? err.message : String(err)}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleUpdate = async (updates: Partial<Todo>) => {
        if (!todo) return;
        try {
            setError(null);
            const updatedTodo = await updateTodo(todo.id, updates);
            setTodo(updatedTodo);
        } catch (err) {
            console.error("Error updating todo:", err);
            setError(`Failed to update todo. Error: ${err instanceof Error ? err.message : String(err)}`);
        }
    };

    const handleDelete = async () => {
        if (!todo) return;
        try {
            setError(null);
            await deleteTodo(todo.id);
            navigate('/');
        } catch (err) {
            console.error("Error deleting todo:", err);
            setError(`Failed to delete todo. Error: ${err instanceof Error ? err.message : String(err)}`);
        }
    };

    if (isLoading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-center mt-8">
                <p className="text-red-500">{error}</p>
                <div className="mt-4">
                    <button onClick={() => window.location.reload()}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                        Retry
                    </button>
                    <button onClick={() => navigate('/')} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!todo) {
        return <div className="text-center mt-8">Todo not found</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 break-words">{todo.title}</h2>
            <p className="mb-4 whitespace-pre-wrap break-words">{todo.content}</p>
            <div className="flex space-x-2 mb-4">
                <button
                    onClick={() => handleUpdate({completed: !todo.completed})}
                    className={`px-4 py-2 rounded ${todo.completed ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
                >
                    {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </div>
            <h3 className="text-xl font-bold mb-2">Comments</h3>
            <CommentList comments={comments} setComments={setComments} todoId={todo.id}/>
            <AddCommentForm todoId={todo.id} setComments={setComments}/>
        </div>
    );
};

export default TaskDetailPage;