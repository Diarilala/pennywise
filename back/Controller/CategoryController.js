import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { v4 as uuidv4 } from 'uuid';

export async function updateCategory(categoryId, userId, updatedCategory) {
    try {
        const {created_at, user_id, category_id, ...updatedData} = updatedCategory;
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
        const freshlyUpdatedCategory = await prisma.categories.update(
            {
                where: {
                    category_id: categoryId,
                },
                data: {
                    name: updatedCategory.name
                }
            }
        );
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: 'Internal Server Error'
        }
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

};

export const getUserCategories = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const categories = await prisma.categories.findMany({
            where: {
                user_id: userId,
            }
        });

        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching user categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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

export const getCategoryById = async (req, res) => {
    const catId = req.params.id;

    try{
        const category = await prisma.categories.findUnique({
            where: {
                category_id: catId
            }
        })
        res.status(200).json(category)
    } catch(err) {
        console.error(err);
        res.status(500);
    }
}