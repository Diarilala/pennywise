import { PrismaClient } from "@prisma/client";
import express from 'express';
const prisma = new PrismaClient();
import { v4 as uuidv4 } from 'uuid';

export async function updateCategory(categoryId, userId, updatedCategory) {
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
        return deleteCategory
    }   catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "Internal Server Error"
        }
    }
}
export const getUserCategories = async (req, res) => {
    try {
        const  user_id = req.user.userId;

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
        console.log("categories:", categories);
        
        res.send(categories);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Oh no, something went wrong' });
    }
};

export const createCategory = async (req, res) => {
    const userId = req.user.userId;
    const {name} = req.body;
    try {
            const newCategory = await prisma.categories.create({
                data: {
                    category_id: uuidv4(),
                    user_id: userId,
                    name: name
                }
            })
            console.log("Creation");
            res.send(newCategory);
            
        } catch (error) {
            console.error(error);
        }
}
