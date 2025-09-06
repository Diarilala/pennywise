import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { randomUUID } from 'crypto';

class SummaryController {
    static async getUserSummary(userId, dateRange = {}) {
        try {
            const user = await prisma.users.findUnique({
                where: { id: userId }
            });

            if (!user) {
                throw new Error('User not found');
            }

            const dateFilter = {};
            if (dateRange.startDate) {
                dateFilter.gte = new Date(dateRange.startDate);
            }
            if (dateRange.endDate) {
                dateFilter.lte = new Date(dateRange.endDate);
            }

            const totalIncome = await prisma.transaction.aggregate({
                where: {
                    userId: userId,
                    type: 'INCOME',
                    date: Object.keys(dateFilter).length > 0 ? dateFilter : undefined
                },
                _sum: {
                    amount: true
                }
            });

            const totalExpenses = await prisma.transaction.aggregate({
                where: {
                    userId: userId,
                    type: 'EXPENSE',
                    date: Object.keys(dateFilter).length > 0 ? dateFilter : undefined
                },
                _sum: {
                    amount: true
                }
            });

            const netBalance = (totalIncome._sum.amount || 0) - (totalExpenses._sum.amount || 0);

            const transactionsByCategory = await prisma.transaction.groupBy({
                by: ['categoryId'],
                where: {
                    userId: userId,
                    date: Object.keys(dateFilter).length > 0 ? dateFilter : undefined
                },
                _sum: {
                    amount: true
                }
            });

            const recentTransactions = await prisma.transaction.findMany({
                where: {
                    userId: userId,
                    date: Object.keys(dateFilter).length > 0 ? dateFilter : undefined
                },
                orderBy: {
                    date: 'desc'
                },
                take: 5,
                include: {
                    category: true
                }
            });

            return {
                userId,
                period: dateRange,
                totals: {
                    income: totalIncome._sum.amount || 0,
                    expenses: totalExpenses._sum.amount || 0,
                    netBalance: netBalance
                },
                byCategory: transactionsByCategory,
                recentTransactions: recentTransactions,
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
            console.error("Oops, error getting yearly summary: ", error);
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
}

export default SummaryController;