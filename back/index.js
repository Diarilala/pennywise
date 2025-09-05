import express from 'express';
import expenseRoutes from './routes/ExpenseRoutes.js'

const app = express();
app.use(express.json());

app.use('/expense', expenseRoutes )

app.listen(3000, () => {
    console.log("Listening to port 3000"); 
})