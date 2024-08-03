import './loadEnv.js';
import express, { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';
import productRoutes from './routes/products.js';

const port = process.env.PORT || 9000;
const app = express();

app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => res.send('Welcome to my ecommerce-app'));

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();