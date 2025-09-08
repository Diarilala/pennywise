import { PrismaClient } from "@prisma/client";
import req from "express/lib/request.js";
import res from "express/lib/response.js";

const prisma = new PrismaClient();

export async function updateCategory(categoryId, userId, updatedCategory) {
    try {
        const Category = await prisma.categories.findUnique(
            {
                where: {
                    category_id: categoryId,
                    user_id: req.user.user_id
                }
            }
        );
        if (!Category) {
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