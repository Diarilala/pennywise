import express from 'express';

import cors from 'cors'

import userRoutes from './routes/UserRoutes.js'
import expenseRoutes from './routes/ExpenseRoutes.js'
import receiptRoutes from './routes/ReceiptRoutes.js'
import categoryRoutes from './routes/CategoryRoutes.js'
import cookieParser from "cookie-parser";
import summaryRoutes from './routes/SummaryRoutes.js'


const app = express();


app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true                 
}));

app.use(cookieParser());


app.use(express.json());

app.use('/api/expense', expenseRoutes )

app.use('/api/receipt', receiptRoutes);

app.use('/api', userRoutes);

app.use('/api/category', categoryRoutes);

app.use('/api/summary' , summaryRoutes);

app.listen(3000, () => {
    console.log("Listening to port 3000"); 
})