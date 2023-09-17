import express from 'express';
import * as blogService from '../services/blogServices';
const User = require('../models/User');
import mongoose, { mongo } from "mongoose";
import { BlogModel } from '../models/blogModel';


// 1. create a post 
export const CreatePostHandler = async (req: express.Request, res: express.Response) => {
    
    const { title, content } = req.body;
    if(!title) {
        return res.status(400).send({ message: 'Title and author are required' });
    }
    if(title.length < 5 || title.length > 40) {
        return res.status(400).send({ message: 'Title must be between 5 and 40 characters'});
    }

    const user = await User.findById(req.authorId);
    //console.log(req.authorId); 
    const createdPost = await blogService.createPost({

        title,
        content,
        author: user._id ,
    });
    return res.status(201).send({message:'post created successfully', createdPost});
};

// 2. edit a post.
export const EditPostHandler = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try{
        const edited = await blogService.editPost(id, {
            title,
            content,
        });
        return res.status(200).send(edited);
    }
    catch(err: any){
        if(err.message === 'Not Found!'){
            return res.status(404).send({ message: 'Post not found'});
        }
        return res.status(400).send({ message: 'Invalid ID' });
    }
};

// 3. get all posts in the blog
export const GetAllPostHandler = async (req: express.Request, res: express.Response) => {
    const posts = await blogService.getAllPosts();
    return res.status(200).send(posts);
};

// 4. get a specific post via the post id
export const getOnePostByIdHandler = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try{
        const post = await blogService.getOnePostById(id);
        if(!post){
            return res.status(404).send({ message: 'Post not found' });
        }
        return res.status(200).send(post);
    }
    catch(err){
        return res.status(400).send({ message: 'Invalid ID'});
    }
};

// 5. delete post
export const DeletePostByIdHandler = async (req: express.Request, res: express.Response) => {
    const { blogId } = req.params;
    try{
        await blogService.deletePostById(blogId);
        return res.status(200).send({ message: 'Post deleted successfully' });
    }
    catch( err : any){
        if(err.message === 'Not Found!'){
            return res.status(404).send({ message: 'Post not found'});
        }
        return res.status(400).send({ message: 'Invalid ID'});
    }
} ;

// 6. like a post
export const LikePostHandler = async (req: express.Request, res: express.Response) => {
    let blog_id = req.params.blog_id;
    if(!mongoose.Types.ObjectId.isValid(blog_id)){
        return res.status(400).send({
            message: 'Invalid blog id'
        });
    }

    const user = await User.findById(req.authorId);

    BlogModel.findById({ _id: blog_id }).then(async(blog) => {
        if(!blog){
            return res.status(400).send({
                message:'No blog found'
            });
        }else{
            let current_user = user.username;

            try{
                if(blog){
                    await BlogModel.updateOne({
                        _id: blog_id
                    },{
                        $push: {likes: `${current_user} liked this post `}
                    })
                    return res.status(200).send({
                        message: 'You liked this post'
                    })
                }
            }catch(err: any){
                return res.status(400).send({
                    message: err.message
                });
            }
        }
    })
}

// 7. unlike a post
export const UnLikePostHandler = async (req: express.Request, res: express.Response) => {
    let blog_id = req.params.blog_id;
    if(!mongoose.Types.ObjectId.isValid(blog_id)){
        return res.status(400).send({
            message: 'Invalid blog id'
        });
    }

    const user = await User.findById(req.authorId);

    BlogModel.findById({ _id: blog_id }).then(async(blog) => {
        if(!blog){
            return res.status(400).send({
                message:'No blog found'
            });
        }else{
            let current_user = user.username;

            try{
                if(blog){
                    await BlogModel.updateOne({
                        _id: blog_id
                    },{
                        $pull: {likes: `${current_user} liked this post `}
                    })
                    return res.status(200).send({
                        message: 'You unliked this post, idan whyy'
                    })
                }
            }catch(err: any){
                return res.status(400).send({
                    message: err.message
                });
            }
        }
    })
}

// 8. dislike a post
export const DislikePostHandler = async (req: express.Request, res: express.Response) => {
    let blog_id = req.params.blog_id;
    if(!mongoose.Types.ObjectId.isValid(blog_id)){
        return res.status(400).send({
            message: 'Invalid blog id'
        });
    }

    const user = await User.findById(req.authorId);

    BlogModel.findById({ _id: blog_id }).then(async(blog) => {
        if(!blog){
            return res.status(400).send({
                message:'No blog found'
            });
        }else{
            let current_user = user.username;

            try{
                if(blog){
                    await BlogModel.updateOne({
                        _id: blog_id
                    },{
                        $push: {dislikes: `${current_user} disliked this post `}
                    })
                    return res.status(200).send({
                        message: 'You disliked this post'
                    })
                }
            }catch(err: any){
                return res.status(400).send({
                    message: err.message
                });
            }
        }
    })
}

// 9. revert dislike a post
export const RevertDislikePostHandler = async (req: express.Request, res: express.Response) => {
    let blog_id = req.params.blog_id;
    if(!mongoose.Types.ObjectId.isValid(blog_id)){
        return res.status(400).send({
            message: 'Invalid blog id'
        });
    }

    const user = await User.findById(req.authorId);

    BlogModel.findById({ _id: blog_id }).then(async(blog) => {
        if(!blog){
            return res.status(400).send({
                message:'No blog found'
            });
        }else{
            let current_user = user.username;

            try{
                if(blog){
                    await BlogModel.updateOne({
                        _id: blog_id
                    },{
                        $pull: {dislikes: `${current_user} disliked this post `}
                    })
                    return res.status(200).send({
                        message: 'You revert dislike this post'
                    })
                }
            }catch(err: any){
                return res.status(400).send({
                    message: err.message
                });
            }
        }
    })
}