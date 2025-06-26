import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './config/dbConnection.js';


dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  dbConnection();
  console.log(`Server is running on http://localhost:${port}`);
});