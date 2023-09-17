import mongoose, { mongo } from "mongoose";

const schema = new mongoose.Schema({
     comment: String,
    user_id: String, //{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment_id: { type: mongoose.Schema.Types.ObjectId}
},{
    timestamps: true,
});

export const BlogComment = mongoose.model('BlogComment',schema);
