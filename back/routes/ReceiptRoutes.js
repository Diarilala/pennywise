import express from 'express'
import { createReceipt, getReceiptById } from '../Controller/ReceiptController.js';
import middleware from '../Middleware/authMiddleware.js';
const router = express.Router();

router.use(middleware)
router.get('/:id', getReceiptById);

router.post('/', createReceipt);

export default router;