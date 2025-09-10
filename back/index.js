import express from 'express';
import expenseRoutes from './routes/ExpenseRoutes.js'
import receiptRoutes from './routes/ReceiptRoutes.js'
import userRoutes from './routes/UserRoutes.js'
import categoryRoutes from './routes/CategoryRoutes.js'

const app = express();
app.use(express.json());

app.use('/expense', expenseRoutes );

app.use('/receipt', receiptRoutes);

app.use('/api', userRoutes);

app.use('/api/category', categoryRoutes);

app.listen(3000, () => {
    console.log("Listening to port 3000"); 
})