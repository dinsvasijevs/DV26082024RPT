import React from 'react';
import {Link} from 'react-router-dom';
import {Todo} from '../types';
import {useTodoContext} from '../contexts/TodoContext';

interface Props {
    todo: Todo;
}

const TodoItem: React.FC<Props> = ({todo}) => {
    const {updateTodo} = useTodoContext();

    return (
        <div
            className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => updateTodo(todo.id, {completed: !todo.completed})}
                    className="mr-4 h-5 w-5 text-blue-600"
                />
                <div>
                    <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : ''}`}>{todo.title}</h3>
                    <p className="text-gray-600 text-sm">{todo.content.substring(0, 50)}...</p>
                </div>
            </div>
            <Link to={`/task/${todo.id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
                View
            </Link>
        </div>
    );
};

export default TodoItem;