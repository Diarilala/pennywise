import express from 'express'
import { getAllUserExpense, createUserExpense } from '../Controller/expenseController.js';

import { authenticateToken } from '../Middleware/authentMiddleware.js';

const router = express.Router();

router.get("/" , authenticateToken ,  getAllUserExpense );

router.post("/", authenticateToken, createUserExpense );

router.get("/:id", (req, res) => {

});

router.put(":id", (req, res) => {

});

router.delete("/:id", (req, res) => {

});

export default router;