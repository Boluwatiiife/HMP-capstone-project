import mongoose, { mongo } from "mongoose";

export interface CreatePostBody {
    title: string,
    content: string,
    author: string//{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}

export interface EditPostBody {
    title: string,
    content: string,
}

export interface CommentOnPost {
    comments: {
        commentId: mongoose.Types.ObjectId,
        userId: mongoose.Types.ObjectId,
        comment: string,
     }[],
}