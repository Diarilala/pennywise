import express from 'express';
import middleware from "../Middleware/authMiddleware.js";
import {updateCategory} from "../Controller/CategoryController.js";

const router = express.Router();

router.use(middleware)

router.put("/:id", updateCategory);

router.delete("/:id");

export default router;