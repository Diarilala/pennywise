import express from 'express';
import expenseRoutes from './routes/ExpenseRoutes.js'
import receiptRoutes from './routes/ReceiptRoutes.js'
import cors from 'cors'
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/expense', expenseRoutes )

app.use('/receipt', receiptRoutes);

app.listen(3000, () => {
    console.log("Listening to port 3000"); 
})