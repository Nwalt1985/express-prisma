import { Request, Response, Router } from 'express';
import { createUser, createUserPost } from '../repo';
import { User } from '@prisma/client';
import { UserPost } from '../types/user.types';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.post('/user', async (req: Request, res: Response) => {
	const user: User = req.body;
	const newUser = await createUser(user);
	
    res.status(StatusCodes.CREATED).send(`User Created with id: ${newUser.id}`);
});

router.post('/user/post', async (req: Request, res: Response) => {
	const post: UserPost = req.body;
	const newPost = await createUserPost(post);

    res.status(StatusCodes.CREATED).send(`Post Created with id: ${newPost.id}`);
});

export default router;