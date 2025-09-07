import express from 'express';

const router = express.Router();

router.get('/auth/login');

router.get('/auth/signup');

router.get('/user/profile');

export default router;