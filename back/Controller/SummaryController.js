import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSummary=   async (req, res) => {
    try {
        const { userId, startDate, endDate } = req.query;
        console.log(req.query);
        
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const whereClause = {
            user_id: userId,
            ...(startDate && endDate && {
                date: {
                    gte: startDate,
                    lte: endDate
                }
            })
        };

        const [expenses, incomes, recentExpenses, recentIncomes] = await Promise.all([
            prisma.expenses.aggregate({
                where: whereClause,
                _sum: { amount: true }
            }),
            prisma.incomes.aggregate({
                where: whereClause,
                _sum: { amount: true }
            }),
            prisma.expenses.findMany({
                where: whereClause,
                orderBy: { date: 'desc' },
                take: 5,
                include: { categories: true }
            }),
            prisma.incomes.findMany({
                where: whereClause,
                orderBy: { date: 'desc' },
                take: 5
            })
        ]);
        // console.log("incomes: ", incomes);
        // console.log("expenses: ", expenses);
        // console.log("recent ncomes: ", recentIncomes);
        // console.log("recent exp: ", recentExpenses);
        
        
        const totalIncome = incomes._sum.amount || 0;
        const totalExpenses = expenses._sum.amount || 0;

        res.json({
            totals: {
                income: totalIncome,
                expenses: totalExpenses,
                netBalance: totalIncome - totalExpenses
            },
            recentTransactions: {
                expenses: recentExpenses,
                incomes: recentIncomes
            }
        });

    } catch (error) {
        console.error("Summary error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getMonthlySummary = async (req, res) => {
    try {
        const { userId, year, month } = req.query;

        if (!userId || !year || !month) {
            return res.status(400).json({ error: "User ID, year, and month are required" });
        }


        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const whereClause = {
            user_id: userId,
            date: {
                gte: startDate,
                lte: endDate
            }
        };

        const [expenses, incomes] = await Promise.all([
            prisma.expenses.aggregate({
                where: whereClause,
                _sum: { amount: true }
            }),
            prisma.incomes.aggregate({
                where: whereClause,
                _sum: { amount: true }
            })
        ]);

        const totalIncome = incomes._sum.amount || 0;
        const totalExpenses = expenses._sum.amount || 0;

        res.json({
            period: { year, month },
            totals: {
                income: totalIncome,
                expenses: totalExpenses,
                netBalance: totalIncome - totalExpenses
            }
        });

    } catch (error) {
        console.error("Monthly summary error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}




export const getSummaryAlert =async (req, res) => {
        try {
            const { userId } = req.query;
            if (!userId) return res.status(400).json({ error: "User ID required" });

            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(today.getDate() - 30);

            const [monthlyIncome, monthlyExpenses, recentExpenses] = await Promise.all([
                prisma.incomes.aggregate({
                    where: { user_id: userId, date: { gte: monthStart, lte: today } },
                    _sum: { amount: true }
                }),
                prisma.expenses.aggregate({
                    where: { user_id: userId, date: { gte: monthStart, lte: today } },
                    _sum: { amount: true }
                }),
                prisma.expenses.aggregate({
                    where: { user_id: userId, date: { gte: thirtyDaysAgo, lte: today } },
                    _avg: { amount: true }
                })
            ]);

            const income = Number(monthlyIncome._sum.amount) || 0;
            const expenses = Number(monthlyExpenses._sum.amount) || 0;
            const avgSpending = Number(recentExpenses._avg.amount) || 0;
            const highSpendThreshold = avgSpending * 2;

            const highSpending = await prisma.expenses.findMany({
                where: {
                    user_id: userId,
                    date: { gte: thirtyDaysAgo, lte: today },
                    amount: { gt: highSpendThreshold }
                },
                include: { categories: true },
                orderBy: { amount: 'desc' },
                take: 3
            });

            const alerts = [];

            if (highSpending.length > 0) {
                alerts.push({
                    type: "high_spending",
                    message: `${highSpending.length} unusual spending(s) detected`,
                    items: highSpending
                });
            }

            if (expenses > income * 0.7) {
                alerts.push({
                    type: "high_ratio",
                    message: `Spent ${((expenses / income) * 100).toFixed(0)}% of monthly income`
                });
            }

            if (alerts.length === 0) {
                alerts.push({
                    type: "all_good",
                    message: "No financial alerts"
                });
            }

            res.json({ alerts });

        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
};
