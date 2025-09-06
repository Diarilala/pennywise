import express from 'express'
import { getAllUserExpense, createUserExpense, getExpenseById, editExpense, deleteExpense } from '../Controller/expenseController.js';

import { authenticateToken } from '../Middleware/authentMiddleware.js';

const router = express.Router();

router.get("/" , authenticateToken ,  getAllUserExpense );

router.post("/", authenticateToken, createUserExpense );

router.get("/:id", authenticateToken, getExpenseById);

router.put("/:id", authenticateToken, editExpense );

router.delete("/:id", authenticateToken, deleteExpense);

export default router;