import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import workspaceRouter from './routes/workspaceRoute.js';
import boardRouter from './routes/boardRoute.js';
import columnRouter from './routes/columnRoute.js';
import cardRouter from './routes/cardRoute.js';
import uploadRouter from './routes/uploadRoute.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['https://larvolynkina-trello-rs-clone-2022q3.netlify.app', 'http://localhost:3000'],
  }),
);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3002;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/workspaces', workspaceRouter);
app.use('/boards', boardRouter);
app.use('/columns', columnRouter);
app.use('/cards', cardRouter);
app.use('/upload', uploadRouter);
