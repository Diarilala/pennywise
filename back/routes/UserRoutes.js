import express from 'express';
import cors from 'cors';
import {displayProfile, loginUser, registerUser} from "../Controller/UserController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();


router.post('/auth/signup', registerUser);
router.post('/auth/login', loginUser);
router.use(authMiddleware);
router.get('/user/profile', displayProfile);

export default router;