import express from 'express'

import authMiddleware from '../middleware/authMiddleware.js';

import { getProducts, addProducts, updateProduct, deleteProduct} from '../controllers/productController.js';

const router = express.Router();


router.get('/', authMiddleware, getProducts);
router.post('/add', authMiddleware, addProducts);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);


export default router