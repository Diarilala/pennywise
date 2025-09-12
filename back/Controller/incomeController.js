import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

export const getUserIncomes = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const incomes = await prisma.incomes.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });

    res.json(incomes);
  } catch (err) {
    console.error('getUserIncomes error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createIncome = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
console.log('rererrrerere');
    const { amount, source, description, frequency, received_date } = req.body;

    if (amount == null || Number.isNaN(Number(amount))) {
      return res.status(400).json({ message: 'amount is required and must be a number' });
    }

    const created = await prisma.incomes.create({
      data: {
        income_id: randomUUID(),
        user_id: userId,
        amount: Number(amount),
        source: source || 'Other',
        description: description || '',
        date: new Date()
      },
    });
    console.log('rererr');
    
    res.status(201).json(created);
  } catch (err) {
    console.error('createIncome error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateIncome = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const incomeId = req.params.id;
    const existing = await prisma.incomes.findUnique({ where: { income_id: incomeId } });

    if (!existing || existing.user_id !== userId) {
      return res.status(404).json({ message: 'Income not found' });
    }

    const { amount, source, description, frequency, received_date } = req.body;

    const updated = await prisma.incomes.update({
      where: { income_id: incomeId },
      data: {
        ...(amount != null ? { amount: Number(amount) } : {}),
        ...(source != null ? { source } : {}),
        ...(description != null ? { description } : {}),
        ...(frequency != null ? { frequency } : {}),
        ...(received_date != null ? { received_date: new Date(received_date) } : {}),
      },
    });

    res.json(updated);
  } catch (err) {
    console.error('updateIncome error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const incomeId = req.params.id;
    const existing = await prisma.incomes.findUnique({ where: { income_id: incomeId } });

    if (!existing || existing.user_id !== userId) {
      return res.status(404).json({ message: 'Income not found' });
    }

    await prisma.incomes.delete({ where: { income_id: incomeId } });
    res.status(204).send();
  } catch (err) {
    console.error('deleteIncome error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


