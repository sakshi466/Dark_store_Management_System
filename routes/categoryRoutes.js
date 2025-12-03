import express from 'express';
import { addCategory } from '../controllers/categoryController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { getCategories } from '../controllers/categoryController.js';
import { updateCategory } from '../controllers/categoryController.js';
import { deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.post('/add',authMiddleware, addCategory);
router.get('/', authMiddleware, getCategories);
router.put('/:id', authMiddleware, updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);      


export default router;


