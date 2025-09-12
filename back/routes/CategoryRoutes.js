import express from 'express';
import middleware from "../Middleware/authMiddleware.js";

import {deleteCategory, updateCategory, createCategory, getUserCategories, getCategoryById} from "../Controller/CategoryController.js";


const router = express.Router();

router.use(middleware)

router.put("/:id",  async (req, res) => {
    const result = await updateCategory(
        req.params.id,
        req.user.userId, // was user_id
        req.body
    );
    res.status(result.status).json({
        success: result.success,
        error: result.error,
        updatedCategory: result.updatedCategory
    });
});

router.delete("/:id", async (req, res) => {
    const result = await deleteCategory(
        req.params.id,
        req.user.userId, 
    );
    res.status(result.status).json({
        success: result.success,
        error: result.error
    });
});

router.get('/:id', getCategoryById)

router.get("/",  getUserCategories)

router.post("/" , createCategory)


export default router;