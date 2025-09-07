const { PrismaClient } = require('@prisma/client');
const express = require("express");
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT ;

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

