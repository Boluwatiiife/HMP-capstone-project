import { BlogModel } from '../models/blogModel';
import { CommentOnPost, CreatePostBody, EditPostBody } from '../interfaces/blogTypes';
import mongoose, { mongo } from "mongoose";


//1.
export const createPost = async function ( body: CreatePostBody): Promise<any> {
    const { title, content, author } = body;
    
    return await BlogModel.create({
        title,
        content,
        author,
    });
};

// 2.
export const editPost = async function (id: string, body: EditPostBody): Promise<any> {
    const editBlog = await BlogModel.findById(id);
    const { title,content } = body;
    if(!editBlog) {
        throw new Error('Not Found!');
    }
    if(title){
        editBlog.title = title;
    }
    if(content){
        editBlog.content = content;
    }
    await editBlog.save();
    return editBlog;
};

// 3.
export const getAllPosts = async function(): Promise<any> {
    return BlogModel.find();
}

// 4.
export const getOnePostById = async function (id: string): Promise<any> {
    return BlogModel.findById(id);
}

//5.
export const deletePostById = async function ( id: string): Promise<any> {
    const post = await BlogModel.findById(id);
    if(!post){
        throw new Error('Not Found!');
    }
    // then delete.
    await post.deleteOne();
}