import express from 'express';
const User = require('../models/User');
import jwt from "jsonwebtoken";

// handle errors.
// i handled all errors in a function here, so i can call the function inside all my catch err code.
const handleErrors = (err: any) => {
    console.log(err.message, err.code);
    let errors = { email:'', password:'' };

    // incorrect email.
    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registered';
    }

    // incorrect password.
    if(err.message === 'incorrect password'){
        errors.password = 'that password is incorrect';
    }

    // dupilcation error code.
    if(err.code === 11000){
        errors.email = 'this email is already registered idan';
        return errors;
    }

 return errors;
}

// created a variable and stored the time the token will last for inside the variable.
 const maxAge = 60 * 60 * 60;

 const creatToken = (id: any) => {
    return jwt.sign({ id }, 'secret', {
        expiresIn: maxAge
    });
 }

// sign up handler.
 export const signupHandler = async (req: express.Request, res: express.Response) => {
    const { email, password, username } = req.body;

    try{
        const user = await User.create({ email, password,username });
        const token = creatToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({ username, email, password, user_id: user._id });
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
 }

 // login handler.
export const loginHandler = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    try{
        const user = await User.login(email, password);
        const token = creatToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({ message:`you are logged in as ${user.username}`,user: user,token});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}