import express from 'express';

import cors from 'cors'

import userRoutes from './routes/UserRoutes.js'
import expenseRoutes from './routes/ExpenseRoutes.js'
import receiptRoutes from './routes/ReceiptRoutes.js'
import categoryRoutes from './routes/CategoryRoutes.js'
import cookieParser from "cookie-parser";


const app = express();


app.use(cors(
    {credentials: true,
        origin: "http://locahost:5173"
    }
));

app.use(cookieParser());


app.use(express.json());

app.use('/api/expense', expenseRoutes )

app.use('/api/receipt', receiptRoutes);

app.use('/api', userRoutes);

app.use('/api/category', categoryRoutes);

app.listen(3000, () => {
    console.log("Listening to port 3000"); 
})