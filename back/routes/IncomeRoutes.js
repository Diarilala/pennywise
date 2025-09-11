import express from 'express'
import { getAllUserIncome, createUserIncome, getIncomeById, editIncome, deleteIncome } from '../Controller/incomeController.js';

import middleware from '../Middleware/authMiddleware.js';

const router = express.Router();

router.use(middleware)
router.get("/" ,  getAllUserIncome );

router.post("/", createUserIncome );

router.get("/:id", getIncomeById);

router.put("/:id", editIncome );

router.delete("/:id", deleteIncome);

export default router;