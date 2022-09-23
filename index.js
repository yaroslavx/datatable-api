import express from 'express';
import mongoose from 'mongoose';
const app = express();
import cors from 'cors';
import { create, getAllItems } from './controllers/ItemController.js';

// Подсоединение MongoDB
mongoose
  .connect(process.env.MONGO)
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

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server started');
});
