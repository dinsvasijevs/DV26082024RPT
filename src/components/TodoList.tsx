import React from 'react';
import { useTodoContext } from '../contexts/TodoContext';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
    const { todos } = useTodoContext();

    return (
        <div className="space-y-4">
            {todos.length === 0 ? (
                <p className="text-center text-gray-500">No todos yet. Add one above!</p>
            ) : (
                todos.map(todo => <TodoItem key={todo.id} todo={todo} />)
            )}
        </div>
    );
};

export default TodoList;