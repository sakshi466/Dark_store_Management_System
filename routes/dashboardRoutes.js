import express from 'express';


import authMiddleware from '../middleware/authMiddleware.js';
import { getData } from '../controllers/dashboardContoller.js';



const router = express.Router();

router.post('/add',authMiddleware, getData);
router.get('/',authMiddleware, getData);
// router.delete('/:id', authMiddleware, deleteUser);      


export default router;


