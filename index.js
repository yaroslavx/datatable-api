import express from 'express';
import mongoose from 'mongoose';
const app = express();
import cors from 'cors';
import { create, getAllItems } from './controllers/ItemController.js';

// Подсоединение MongoDB
mongoose
  .connect(
    'mongodb+srv://admin:gMqQCj2GJdSdNIrz@cluster0.icufnus.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Mongo started');
  })
  .catch((err) => {
    console.log('Mongo not started', err);
  });

app.use(express.json());

// CORS, чтобы не ругался на внешние запросы
app.use(cors());

// запросы для работы с данными
app.get('/', getAllItems);
app.post('/item', create);

app.listen(5000, () => console.log('API is working!'));
