import express from 'express';
import expenseRoutes from './routes/ExpenseRoutes.js'
import receiptRoutes from './routes/ReceiptRoutes.js'
<<<<<<< HEAD
import userRoutes from './routes/UserRoutes.js'
import categoryRoutes from './routes/CategoryRoutes.js'
import cors from 'cors'
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
=======
import cors from 'cors'
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
import userRoutes from './routes/UserRoutes.js'
import categoryRoutes from './routes/CategoryRoutes.js'
>>>>>>> 6e5c0d25f08c2e1bdd838258d1210c0fb0ab24aa

const app = express();

app.use(cors());

app.use(express.json());


app.use('/api/expense', expenseRoutes )
<<<<<<< HEAD
=======

>>>>>>> 6e5c0d25f08c2e1bdd838258d1210c0fb0ab24aa

app.use('/receipt', receiptRoutes);
app.get("/api/categories", async (req, res) => {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({ error: 'Sorry, user ID is required' });
        }

        const categories = await prisma.categories.findMany({
            where: {
                user_id: user_id
            },
            orderBy: {
                name: 'asc'
            }
        });

        res.json(categories);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Oh no, something went wrong' });
    }
});

app.use('/api', userRoutes);

app.use('/api/category', categoryRoutes);

app.listen(3000, () => {
    console.log("Listening to port 3000"); 
})