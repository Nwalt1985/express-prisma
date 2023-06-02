import { Request, Response, Router } from 'express';
import { getUsers, getUserByEmail, getUserPostByEmail } from '../repo';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/users', async (req: Request, res: Response) => {
    res.status(200).send(await getUsers());
});

router.get('/user', async (req: Request, res: Response) => {
	const { email } = req.query;
    res.status(StatusCodes.OK).send(await getUserByEmail(email as string));
});

router.get('/user/post', async (req: Request, res: Response) => {
	const { email } = req.query;
    res.status(StatusCodes.OK).send(await getUserPostByEmail(email as string));
});

export default router;