import axios, {AxiosError} from 'axios';
import {Comment, Todo} from '../types';

const API_URL = 'http://localhost:3004';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});

const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('API Error:', axiosError.response?.data || axiosError.message);
        if (axiosError.response) {
            throw new Error(`API error: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`);
        } else if (axiosError.request) {
            throw new Error('No response received from the server. Please check your connection.');
        } else {
            throw new Error(`Error setting up the request: ${axiosError.message}`);
        }
    } else {
        console.error('Unexpected error:', error);
        throw new Error(`An unexpected error occurred: ${String(error)}`);
    }
};

export const fetchTodos = async (): Promise<Todo[]> => {
    try {
        const response = await api.get<Todo[]>('/todos');
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw handleApiError(error);
    }
};


export const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    try {
        const response = await api.post<Todo>('/todos', todo);
        return response.data;
    } catch (error) {
        console.error('Error creating todo:', error);
        throw handleApiError(error);
    }
};

export const updateTodo = async (id: number, todo: Partial<Todo>): Promise<Todo> => {
    try {
        const response = await api.patch<Todo>(`/todos/${id}`, todo);
        return response.data;
    } catch (error) {
        console.error(`Error updating todo with id ${id}:`, error);
        throw handleApiError(error);
    }
};

export const deleteTodo = async (id: number): Promise<void> => {
    try {
        await api.delete(`/todos/${id}`);
    } catch (error) {
        console.error(`Error deleting todo with id ${id}:`, error);
        throw handleApiError(error);
    }
};
export const fetchTodo = async (id: string | number): Promise<Todo> => {
    try {
        const response = await api.get<Todo>(`/todos/${id}`);
        if (!response.data) {
            throw new Error(`Todo with id ${id} not found`);
        }
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error(`Todo with id ${id} not found`);
        }
        console.error(`Error fetching todo with id ${id}:`, error);
        throw handleApiError(error);
    }
};

export const fetchComments = async (todoId: string | number): Promise<Comment[]> => {
    try {
        const response = await api.get<Comment[]>(`/comments?todoId=${todoId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching comments for todo with id ${todoId}:`, error);
        throw handleApiError(error);
    }
};

export const createComment = async (comment: Omit<Comment, 'id'>): Promise<Comment> => {
    try {
        const response = await api.post<Comment>('/comments', comment);
        return response.data;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw handleApiError(error);
    }
};

export const updateComment = async (id: number, comment: Partial<Comment>): Promise<Comment> => {
    try {
        const response = await api.patch<Comment>(`/comments/${id}`, comment);
        return response.data;
    } catch (error) {
        console.error(`Error updating comment with id ${id}:`, error);
        throw handleApiError(error);
    }
};

export const deleteComment = async (id: number): Promise<void> => {
    try {
        await api.delete(`/comments/${id}`);
    } catch (error) {
        console.error(`Error deleting comment with id ${id}:`, error);
        throw handleApiError(error);
    }
};