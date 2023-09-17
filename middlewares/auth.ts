// validation middleware, to check if the user is a valid user.

import express, { NextFunction } from 'express';
import jwt from "jsonwebtoken";
import{parseJWT} from './function';
const users = [];

export const validUser = (req: any, res: express.Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).json({ message: 'please login to continue'});
    }
    try{
        const valid = jwt.verify(token, 'secret');
    
        if(valid){
            req.user = valid;
            let id = parseJWT(token).payload.id
           // console.log(`the id is => ${id}`);
            req.authorId = id;
        }else{
            return res.status(401).send({message: 'please login to continue'});
        }
        next();
    }
    catch(err){
        return res.status(401).json({ message: 'Invalid Token bro'});
    }
};