import express, { Request, Response } from 'express';
import getRouter from './routes/get.routes';
import postRouter from './routes/post.routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', getRouter);
app.use('/', postRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});