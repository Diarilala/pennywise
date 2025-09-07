import express from 'express';
import {loginUser, registerUser} from "../Controller/UserController.js";

const router = express.Router();

router.post('/auth/login', loginUser);

router.post('/auth/signup', registerUser);

router.get('/user/profile');

export default router;