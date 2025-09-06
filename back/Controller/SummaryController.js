import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { randomUUID } from 'crypto';

class SummaryController {
    static async getUserSummary(userId, dateRange = {}) {
        try {
            const user = await prisma.users.findUnique({
                where: { user_id: userId }
            });

            if (!user) {
                throw new Error('Oh no, user not found');
            }

            const dateFilter = {};
            if (dateRange.startDate) {
                dateFilter.gte = new Date(dateRange.startDate);
            }
            if (dateRange.endDate) {
                dateFilter.lte = new Date(dateRange.endDate);
            }

            const totalExpenses = await prisma.expenses.aggregate({
                where: {
                    user_id: userId,
                    date: Object.keys(dateFilter).length > 0 ? dateFilter : undefined
                },
                _sum: {
                    amount: true
                }
            });

            const totalIncomes = await prisma.incomes.aggregate({
                where: {
                    user_id: userId,
                    date: Object.keys(dateFilter).length > 0 ? dateFilter : undefined
                },
                _sum: {
                    amount: true
                }
            });

            const netBalance = (totalIncomes._sum.amount || 0) - (totalExpenses._sum.amount || 0);

            const expensesByCategory = await prisma.expenses.groupBy({
                by: ['category_id'],
                where: {
                    user_id: userId,
                    date: Object.keys(dateFilter).length > 0 ? dateFilter : undefined
                },
                _sum: {
                    amount: true
                }
            });

            const recentExpenses = await prisma.expenses.findMany({
                where: {
                    user_id: userId,
                    date: Object.keys(dateFilter).length > 0 ? dateFilter : undefined
                },
                orderBy: {
                    date: 'desc'
                },
                take: 5,
                include: {
                    categories: true
                }
            });

            const recentIncomes = await prisma.incomes.findMany({
                where: {
                    user_id: userId,
                    date: Object.keys(dateFilter).length > 0 ? dateFilter : undefined
                },
                orderBy: {
                    date: 'desc'
                },
                take: 5
            });

            return {
                user_id: userId,
                period: dateRange,
                totals: {
                    income: totalIncomes._sum.amount || 0,
                    expenses: totalExpenses._sum.amount || 0,
                    netBalance: netBalance
                },
                expensesByCategory: expensesByCategory,
                recentExpenses: recentExpenses,
                recentIncomes: recentIncomes,
                summaryDate: new Date()
            };

        } catch (error) {
            console.error('Error getting user summary:', error);
            throw error;
        }
    }

    static async getMonthlySummary(userId, year, month) {
        try {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0, 23, 59, 59);

            return await this.getUserSummary(userId, {
                startDate: startDate,
                endDate: endDate
            });
        } catch (error) {
            console.error('Error getting monthly summary:', error);
            throw error;
        }
    }

    static async getYearlySummary(userId, year) {
        try {
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year, 11, 31, 23, 59, 59);

            return await this.getUserSummary(userId, {
                startDate: startDate,
                endDate: endDate
            });
        } catch (error) {
            console.error('Error getting yearly summary:', error);
            throw error;
        }
    }

    static async getSummaryTrends(userId, period = 'monthly', periodsBack = 6) {
        try {
            const trends = [];
            const currentDate = new Date();

            for (let i = 0; i < periodsBack; i++) {
                let summary;

                if (period === 'monthly') {
                    const date = new Date(currentDate);
                    date.setMonth(date.getMonth() - i);
                    summary = await this.getMonthlySummary(userId, date.getFullYear(), date.getMonth() + 1);
                } else {
                    const date = new Date(currentDate);
                    date.setFullYear(date.getFullYear() - i);
                    summary = await this.getYearlySummary(userId, date.getFullYear());
                }

                trends.push(summary);
            }

            return trends.reverse();
        } catch (error) {
            console.error('Error getting summary trends:', error);
            throw error;
        }
    }

    static async getCategoryBreakdown(userId, dateRange = {}) {
        try {
            const dateFilter = {};
            if (dateRange.startDate) {
                dateFilter.gte = new Date(dateRange.startDate);
            }
            if (dateRange.endDate) {
                dateFilter.lte = new Date(dateRange.endDate);
            }

            const categoryExpenses = await prisma.expenses.groupBy({
                by: ['category_id'],
                where: {
                    user_id: userId,
                    date: Object.keys(dateFilter).length > 0 ? dateFilter : undefined
                },
                _sum: {
                    amount: true
                },
                _count: {
                    expense_id: true
                }
            });

            const categories = await prisma.categories.findMany({
                where: {
                    user_id: userId
                }
            });

            const categoryMap = {};
            categories.forEach(cat => {
                categoryMap[cat.category_id] = cat.name;
            });

            const breakdown = categoryExpenses.map(expense => ({
                category_id: expense.category_id,
                category_name: categoryMap[expense.category_id] || 'Unknown',
                total_amount: expense._sum.amount,
                transaction_count: expense._count.expense_id
            }));

            return breakdown;
        } catch (error) {
            console.error('Error getting category breakdown:', error);
            throw error;
        }
    }
}

export default SummaryController;