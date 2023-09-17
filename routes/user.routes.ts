import express from 'express';
import { signupHandler, loginHandler  } from '../controller/user.controller';
import { CreatePostHandler,
     DeletePostByIdHandler,
      EditPostHandler,
       GetAllPostHandler,
        getOnePostByIdHandler,
         LikePostHandler,
         UnLikePostHandler,
        DislikePostHandler,
    RevertDislikePostHandler} from '../controller/blogController';
import { validUser } from '../middlewares/auth';
import { CommentOnPostt } from '../controller/commentController';

const router = express.Router();

router.post('/user/signup', signupHandler);

router.post('/user/login', loginHandler);

router.get('/blog/all-posts',validUser, GetAllPostHandler);

router.get('/single-post/:id',validUser, getOnePostByIdHandler);

 router.post('/blog/create-post',validUser, CreatePostHandler);

router.put('/post/:id',validUser, EditPostHandler);

router.delete('/post/:blogid',validUser, DeletePostByIdHandler);

router.post('/:blog_id/comment',validUser, CommentOnPostt);

router.post('/:blog_id/like', validUser, LikePostHandler);

router.post('/:blog_id/unlike', validUser, UnLikePostHandler);

router.post('/:blog_id/dislike', validUser, DislikePostHandler);

router.post('/:blog_id/revert-dislike', validUser, RevertDislikePostHandler);


export default router;