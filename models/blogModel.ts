import mongoose, { mongo } from "mongoose";

 const Schema = mongoose.Schema;

// post schema.
const PostSchema = new Schema({
    title: { type: String, required: true, min: 5, max: 40},
    content: String,
    author: String,//{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    likes: [String],
    dislikes: [String],
    comments: [{
        user_id: String,
        comment: String,
    }]
},{
    timestamps: true,
});

export const BlogModel = mongoose.model('blogs', PostSchema);