export interface Todo {
    id: number;
    title: string;
    content: string;
    completed: boolean;
}

export interface Comment {
    id: number;
    todoId: number;
    text: string;
}