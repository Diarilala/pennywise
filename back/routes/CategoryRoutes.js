import express from 'express';
import middleware from "../Middleware/authMiddleware.js";
import {deleteCategory} from "../Controller/CategoryController.js";
import {updateCategory} from "../Controller/CategoryController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.use(middleware)

router.put("/:id", authMiddleware, async (req, res) => {
    const result = await updateCategory(
        req.params.id,
        req.user.user_id,
        req.body
    );
    res.status(result.status).json({
        success: result.success,
        error: result.error,
    })
});

router.delete("/:id", authMiddleware, async (req, res) => {
    const result = await deleteCategory(
        req.params.id,
        req.user.user_id,
    )
});

export default router;