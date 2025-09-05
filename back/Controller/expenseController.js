import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllUserExpense = async (req, res) => {
    const {start, end, category, type} = req.query;
    const user = req.user
    
    let expenses;
    try {
        const category_res = await prisma.categories.findFirst({
        where: {
            name: category
        }
        })
         const category_id = category_res.category_id;
        expenses = await prisma.expenses.findMany({
            where: {
               user_id: user.user,
                created_at: {
                    lt: end,
                    gt: start
                },
                type: type,
                category_id: category_id
            }
        })        
    } catch (error) {
        res.send(error)
    }

    res.send(expenses);
}