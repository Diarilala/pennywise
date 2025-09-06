import express from 'express'
import { authenticateToken } from '../Middleware/authentMiddleware.js';
import { createReceipt } from '../Controller/ReceiptController.js';

const router = express.Router();

router.get('/{id}', authenticateToken);

router.post('/', authenticateToken, createReceipt);

export default router;