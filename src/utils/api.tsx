import axios from 'axios';
import { Todo, Comment } from '../types';

const API_URL = 'http://localhost:3004';

export const fetchTodos = () => axios.get<Todo[]>(`${API_URL}/todos`).then(res => res.data);
export const fetchTodo = (id: number) => axios.get<Todo>(`${API_URL}/todos/${id}`).then(res => res.data);
export const createTodo = (todo: Omit<Todo, 'id'>) => axios.post<Todo>(`${API_URL}/todos`, todo).then(res => res.data);
export const updateTodo = (id: number, todo: Partial<Todo>) => axios.patch<Todo>(`${API_URL}/todos/${id}`, todo).then(res => res.data);
export const deleteTodo = (id: number) => axios.delete(`${API_URL}/todos/${id}`);

export const fetchComments = (todoId: number) => axios.get<Comment[]>(`${API_URL}/comments?todoId=${todoId}`).then(res => res.data);
export const createComment = (comment: Omit<Comment, 'id'>) => axios.post<Comment>(`${API_URL}/comments`, comment).then(res => res.data);
export const updateComment = (id: number, comment: Partial<Comment>) => axios.patch<Comment>(`${API_URL}/comments/${id}`, comment).then(res => res.data);
export const deleteComment = (id: number) => axios.delete(`${API_URL}/comments/${id}`);