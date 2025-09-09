import express from 'express';
import {displayProfile, loginUser, registerUser} from "../Controller/UserController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post('/auth/login', loginUser);

router.post('/auth/signup', registerUser);

router.get('/user/profile',authMiddleware , displayProfile);

export default router;