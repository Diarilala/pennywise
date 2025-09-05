import express from 'express'
import { getAllUserExpense, createUserExpense, getExpenseById } from '../Controller/expenseController.js';

import { authenticateToken } from '../Middleware/authentMiddleware.js';

const router = express.Router();

router.get("/" , authenticateToken ,  getAllUserExpense );

router.post("/", authenticateToken, createUserExpense );

router.get("/:id", authenticateToken, getExpenseById);

router.put(":id", (req, res) => {

});

router.delete("/:id", (req, res) => {

});

export default router;