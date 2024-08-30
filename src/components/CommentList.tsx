import React from 'react';
import {Comment} from '../types';
import CommentItem from './CommentItem';
import {useTodoContext} from '../contexts/TodoContext';

interface Props {
    comments: Comment[];
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    todoId: number;
}

const CommentList: React.FC<Props> = ({comments, setComments}) => {
    const {updateComment, deleteComment} = useTodoContext();

    const handleUpdateComment = async (id: number, text: string) => {
        const updatedComment = await updateComment(id, {text});
        setComments(comments.map(c => c.id === id ? updatedComment : c));
    };

    const handleDeleteComment = async (id: number) => {
        await deleteComment(id);
        setComments(comments.filter(c => c.id !== id));
    };

    return (
        <ul className="space-y-4">
            {comments.map(comment => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    onUpdate={handleUpdateComment}
                    onDelete={handleDeleteComment}
                />
            ))}
        </ul>
    );
};

export default CommentList;