import express from 'express'
import { authenticateToken } from '../Middleware/authentMiddleware.js';
import { createReceipt, getReceiptById } from '../Controller/ReceiptController.js';

const router = express.Router();

router.get('/:id', authenticateToken, getReceiptById);

router.post('/', authenticateToken, createReceipt);

export default router;