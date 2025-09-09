import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require('@prisma/client');
const express = require("express");
const prisma = new PrismaClient();

export async function updateCategory(categoryId, userId, updatedCategory) {
const app = express();
const PORT = process.env.PORT ;

app.get("/api/categories", async (req, res) => {
    try {
        const { created_at, user_id, category_id, ...updatedData } = updatedCategory;
        const category = await prisma.categories.findUnique(
            {
                where: {
                    category_id: categoryId,
                    user_id: userId
                }
            }
        );
        if (!category) {
            console.error("Category not found");
            return {
                status: 404,
                message: "Category not found"
            }
        }
        const updatedCategory = await prisma.categories.update(
            {
                where: {
                    category_id: categoryId,
                },
                data: {
                    user_id: userId,
                    category_id: categoryId,
                    category: updatedData
                }
            }
        );
    }catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        })
    }
}
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

export async function deleteCategory(categoryId, userId) {
    try {
        const category = await prisma.categories.findUnique(
            {
                where: {
                    category_id: categoryId,
                    user_id: userId
                }
            }
        );
        if (!category) {
            console.error("Category not found");
            return {
                status: 404,
                message: "Category not found"
            }
        }

        const deleteCategory = await prisma.categories.delete(
            {
                where: {
                    category_id: categoryId,
                    user_id: userId
                }
            }
        )
        return {
            status: 200,
            message: "Deleted Successfully"
        }
    }   catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "Internal Server Error"
        }
    }
}