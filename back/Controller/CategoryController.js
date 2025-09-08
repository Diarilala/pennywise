import { PrismaClient } from "@prisma/client";
import req from "express/lib/request.js";
import res from "express/lib/response.js";
import middleware from "../Middleware/authMiddleware.js";

const prisma = new PrismaClient();

export async function updateCategory(categoryId, updatedCategory) {
    try {
        const category = await prisma.categories.findUnique(
            {
                where: {
                    category_id: categoryId,
                    user_id: middleware(req.user.user_id)
                }
            }
        );
        if (!category) {
            console.error("Category not found");
            res.status(404).json({
                message: 'Category not found'
            })
        }
        const updatedCategory = await prisma.categories.update(
            {
                where: {
                    category_id: categoryId,
                },
                data: {
                    user_id: req.user.user_id,
                    category_id: categoryId,
                    category: updateCategory(),
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

export async function deleteCategory(categoryId) {
    try {
        const category = await prisma.categories.findUnique(
            {
                where: {
                    category_id: categoryId,
                    user_id: middleware(req.user.user_id)
                }
            }
        );
        if (!category) {
            console.error("Category not found");
            res.status(404).json({
                message: 'Category not found'
            })
        }

        const deleteCategory = await prisma.categories.delete(
            {
                where: {
                    category_id: categoryId,
                    user_id: middleware(req.user.user_id)
                }
            }
        )
        res.status(200).json({
            message: 'Category deleted successfully'
        })
    }   catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        })
    }
}