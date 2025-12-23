import express from 'express';
import { getChatPartners, getAllContects, getMessagesByUserId, sendMessage } from '../controllers/message.controller.js';
import { VerifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(VerifyToken);

router.get('/contacts',getAllContects);
router.get('/chats',getChatPartners);
router.get('/:id',getMessagesByUserId);

router.post('/send/:id',sendMessage);

export default router;