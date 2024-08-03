import { Router } from 'express';
import { upload } from '../utils/awsUploads.js';
import ProductController from '../controllers/products.js';

const productRoutes = Router();

productRoutes.get('/', ProductController.getProducts);
productRoutes.get('/search', ProductController.searchProducts);
productRoutes.get('/:id', ProductController.getProductById);
productRoutes.post('/', upload.array('files'), ProductController.createProduct);


export default productRoutes;