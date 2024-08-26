import React from 'react';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';

const HomePage: React.FC = () => {
    return (
        <div>
            <AddTodoForm />
            <TodoList />
        </div>
    );
};

export default HomePage;