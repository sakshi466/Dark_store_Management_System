import express from 'express';
import { addUser, getUser, deleteUser, getUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/add',authMiddleware, addUser);
router.get('/', getUser);
router.delete('/:id', authMiddleware, deleteUser);  
router.get('/profile',authMiddleware, getUserProfile);



export default router;


