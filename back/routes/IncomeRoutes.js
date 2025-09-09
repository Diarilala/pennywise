import express from 'express'
import { getAllUserIncome, createUserIncome, getIncomeById, editIncome, deleteIncome } from '../Controller/incomeController.js';

import { authenticateToken } from '../Middleware/authentMiddleware.js';

const router = express.Router();

router.get("/" , authenticateToken ,  getAllUserIncome );

router.post("/", authenticateToken, createUserIncome );

router.get("/:id", authenticateToken, getIncomeById);

router.put("/:id", authenticateToken, editIncome );

router.delete("/:id", authenticateToken, deleteIncome);

export default router;