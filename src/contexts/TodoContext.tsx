import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Todo, Comment } from '../types';
import * as api from '../utils/api';

interface TodoContextType {
    todos: Todo[];
    addTodo: (todo: Omit<Todo, 'id'>) => Promise<void>;
    updateTodo: (id: number, todo: Partial<Todo>) => Promise<Todo>;
    deleteTodo: (id: number) => Promise<void>;
    addComment: (comment: Omit<Comment, 'id'>) => Promise<Comment>;
    updateComment: (id: number, comment: Partial<Comment>) => Promise<Comment>;
    deleteComment: (id: number) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        api.fetchTodos().then(setTodos);
    }, []);

    const addTodo = useCallback(async (todo: Omit<Todo, 'id'>) => {
        const newTodo = await api.createTodo(todo);
        setTodos(prevTodos => [...prevTodos, newTodo]);
    }, []);

    const updateTodo = useCallback(async (id: number, todo: Partial<Todo>) => {
        const updatedTodo = await api.updateTodo(id, todo);
        setTodos(prevTodos => prevTodos.map(t => t.id === id ? updatedTodo : t));
        return updatedTodo;
    }, []);

    const deleteTodo = useCallback(async (id: number) => {
        await api.deleteTodo(id);
        setTodos(prevTodos => prevTodos.filter(t => t.id !== id));
    }, []);

    const addComment = useCallback(async (comment: Omit<Comment, 'id'>): Promise<Comment> => {
        return await api.createComment(comment);
    }, []);

    const updateComment = useCallback(async (id: number, comment: Partial<Comment>): Promise<Comment> => {
        return await api.updateComment(id, comment);
    }, []);

    const deleteComment = useCallback(async (id: number): Promise<void> => {
        await api.deleteComment(id);
    }, []);

    const value = {
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        addComment,
        updateComment,
        deleteComment
    };

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};