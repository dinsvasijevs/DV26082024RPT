import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TodoProvider } from './contexts/TodoContext';
import HomePage from './pages/HomePage';
import TaskDetailPage from './pages/TaskDetailPage';

const App: React.FC = () => {
    return (
        <TodoProvider>
            <Router>
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-8 text-center">Todo App</h1>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/task/:id" element={<TaskDetailPage />} />
                    </Routes>
                </div>
            </Router>
        </TodoProvider>
    );
};

export default App;