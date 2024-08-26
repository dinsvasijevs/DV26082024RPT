import React from 'react';
import { useTodoContext } from '../contexts/TodoContext';
import TodoItem from './TodoItem';

const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

const TodoList: React.FC = () => {
    const { todos } = useTodoContext();

    return (
        <div className="space-y-4">
            {todos.length === 0 ? (
                <p className="text-center text-gray-500">No todos yet. Add one above!</p>
            ) : (
                todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={{
                            ...todo,
                            title: truncateText(todo.title, 50),
                            content: truncateText(todo.content, 100)
                        }}
                    />
                ))
            )}
        </div>
    );
};

export default TodoList;