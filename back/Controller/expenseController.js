import { PrismaClient } from '@prisma/client';
import { error, log } from 'console';
import {randomUUID} from 'crypto'
const prisma = new PrismaClient();

export const getAllUserExpense = async (req, res) => {
    const { start, end, category, type } = req.query;
    const user = req.user;
    let expenses;
    try {
        let category_id;
        if (category) {
            const category_res = await prisma.categories.findFirst({
                where: { name: category }
            });
            if (category_res) {
                category_id = category_res.category_id;
            } else {
                return res.send([]);
            }
        }

        const whereClause = {
            user_id: user.user
        };
        if (start && end) {
            whereClause.date = {
                lt: end,
                gt: start
            };
        } else if (start) {
            whereClause.date = { gte: start };
        } else if (end) {
            whereClause.date = { lt: end };
        }
        if (type) {
            whereClause.type = type;
        }
        if (category_id) {
            whereClause.category_id = category_id;
        }

        expenses = await prisma.expenses.findMany({
            where: whereClause
        });
    } catch (error) {
        res.send(error);
        return;
    }
    console.log(expenses.length);
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
                date: date,
                created_at: new Date().toISOString(),
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

export const getExpenseById = async (req, res) => {
    const expenseId = req.params.id;
    console.log(expenseId);
    
    try{
        const targetExpense = await prisma.expenses.findUnique({
            where: {
                expense_id : expenseId
            }
        })
        console.log("ok");
        res.send(targetExpense)
    } catch (err) {
        res.send(err);
    }
}

export const editExpense = async (req, res) => {
    const id = req.params.id;
    const {amount, date, categoryId, description, type, startDate, endDate, receipt} = req.body;
    try{
        console.log("rere");
        
        const updatedExpense = await prisma.expenses.update({
            where: {
                expense_id : id
            },
            data : {
                amount: amount,
                date: date,
                category_id: categoryId,
                description: description,
                type: type,
                start_date: startDate,
                end_date: endDate,
                receipts: receipt
            }
        })
        console.log(updatedExpense);
        
        res.send(updatedExpense);
    } catch (err) {
        console.error(err);
        res.send(err);
    }
}

export const deleteExpense = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedExpense = await prisma.expenses.delete({
            where : {
                expense_id : id
            }
        })
        res.send(deletedExpense)
    } catch (err) {
        console.error(err);
        res.send(err)        
    }
}