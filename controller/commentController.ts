import express from 'express';
import mongoose, { mongo } from "mongoose";
import { BlogModel } from '../models/blogModel';
import { BlogComment } from '../models/blogCommentModel';
const { Validator } = require('node-input-validator');
const User = require('../models/User');

export const CommentOnPostt = async (req: express.Request, res:express.Response) => {
    let blog_id = req.params.blog_id;

    // check if the id passed is a valid mongoose id.
    if(!mongoose.Types.ObjectId.isValid(blog_id)){
        return res.status(400).send({ message: 'Invalid blog id idan'});
    }

    // check if the id passed is saved in our blog collections.
    BlogModel.findById({ _id: blog_id}).then(async (blog) => {
        if(!blog){
            return res.status(400).send({ message:'No blog found'})
        }else{
            try{
                // validation for our comment endpoint => we require only the comment field.
                const v = new Validator(req.body, { comment: 'required' });
                const matched = await v.check();
                if(!matched){
                    return res.status(422).send(v.errors);
                }

                const user = await User.findById(req.authorId);

                let newCommentDocument = new BlogComment({
                    comment: req.body.comment,
                    user_id: user._id,
                    // comment_id
                });

                // save the comment data.
                let commentData = await newCommentDocument.save();

                // then update the blog record in our collection.
                await BlogModel.updateOne(
                    {_id: blog_id},
                    { $push :{comments: commentData}} // push the newly created comment data to the comment array in our blog.
                )
                return res.status(200).send({
                    message: 'Comment successfully added',
                    data: commentData
                });
            }
            catch(err: any){
                return res.status(400).send({
                    message: err.message,
                    data: err
                });
            }
        }
    })
}