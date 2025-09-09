import { PrismaClient } from '@prisma/client';
import { error } from 'console';
import {randomUUID} from 'crypto'
const prisma = new PrismaClient();

export const getAllUserIncome = async (req, res) => {
    const {start, end, source} = req.query;
    const user = req.user
    let incomes;
    try {
        incomes = await prisma.incomes.findMany({
            where: {
                user_id: user.user,
                created_at: {
                    lt: end,
                    gt: start
                },
                source: source
            }
        })        
    } catch (error) {
        res.send(error);
    }
    res.send(incomes);
}

export const createUserIncome = async (req, res) => {
    const {amount, date, description, source} = req.body;
    const user = req.user;
    try{
        const newIncome = await prisma.incomes.create({
            data: {
                income_id: randomUUID(),
                user_id: user.user_id,
                amount: amount,
                created_at: date,
                description: description,
                source: source
            }
        })
        console.log("Creation");
        res.send(newIncome)
    } catch(error){
        console.error(error);
        res.send(error)
    }  
}

export const getIncomeById = async (req, res) => {
    const incomeId = req.params.id;
    console.log(incomeId);
    
    try{
        const targetIncome = await prisma.income.findUnique({
            where: {
                income_id : incomeId
            }
        })
        console.log("ok");
        res.send(targetIncome)
    } catch (err) {
        res.send(err);
    }
}

export const editIncome = async (req, res) => {
    const incomeId = req.params.id;
    const {amount, date, description, source} = req.body;
    try{
        const updatedIncome = await prisma.incomes.update({
            where: {
                income_id: incomeId
            },
            data: {
                amount: amount,
                created_at: date,
                description: description,
                source: source
            }
        })
        res.send(updatedIncome)
    } catch (err) {
        res.send(error);
    }
}

export const deleteIncome = async (req, res) => {  
    const incomeId = req.params.id;
    try{
        const deletedIncome = await prisma.incomes.delete({
            where: {
                income_id: incomeId
            }
        })
        res.send(deletedIncome)
    } catch (err) {
        res.send(error);
    }
}


