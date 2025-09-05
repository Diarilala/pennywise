import { PrismaClient } from '@prisma/client';
import {randomUUID} from 'crypto'
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

export const createUserExpense = async (req, res) => {
    const {amount, date, categoryId, description, type, startDate, endDate, receipt} = req.body;
    const user = req.user;
    try{
        const newExpense = await prisma.expenses.create({
            data: {
                expense_id: randomUUID(),
                user_id: user.user_id,
                category_id: categoryId,
                amount: amount,
                created_at: date,
                type: type,
                start_date: startDate,
                end_date: endDate,
                description: description,
                receipt: receipt
            }
        })
        console.log("Creation");
        res.send(newExpense)
    } catch(err){
        console.error(err);
        res.send(err)
    }
   
}