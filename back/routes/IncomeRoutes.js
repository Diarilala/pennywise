import express from 'express';
import middleware from '../Middleware/authMiddleware.js';
import {
  getUserIncomes,
  createIncome,
  updateIncome,
  deleteIncome
} from '../Controller/incomeController.js';

const router = express.Router();

router.use(middleware);


router.get('/', getUserIncomes);


router.post('/', createIncome);


router.put('/:id', updateIncome);

router.delete('/:id', deleteIncome);

export default router;