import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import uploadRouter from './routes/uploadRoute.js';
import workspaceRouter from './routes/workspaceRoute.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
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

app.use('/', userRouter);
app.use('/upload', uploadRouter);
app.use('/workspaces', workspaceRouter);
