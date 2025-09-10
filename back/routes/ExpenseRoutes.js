import express from 'express'

import { getAllUserExpense, createUserExpense, getExpenseById, editExpense, deleteExpense } from '../Controller/expenseController.js';

import middleware from '../Middleware/authMiddleware.js';

const router = express.Router();

router.use(middleware)

router.get("/", getAllUserExpense);

router.post("/", createUserExpense);

router.get("/:id", getExpenseById);

router.put("/:id", editExpense );

router.delete("/:id", deleteExpense);

export default router;