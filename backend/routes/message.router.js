import express from 'express';
import { getAllChats, getAllContects, getMessagesByUserId, sendMessage } from '../controllers/message.controller.js';
import { VerifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/contects',VerifyToken,getAllContects);
router.get('/chats',VerifyToken,getAllChats);
router.get('/:id',VerifyToken,getMessagesByUserId);

router.post('/send/:id',VerifyToken,sendMessage);

export default router;