import express from 'express'
import middleware from '../Middleware/authMiddleware'

import { getSummary, getMonthlySummary, getSummaryAlert } from '../Controller/SummaryController';

const router = express.Router();

router.use(middleware);

router.get("/" , getSummary);

router.get("/monthly" , getMonthlySummary);

router.get("/alert", getSummaryAlert)

export default router;