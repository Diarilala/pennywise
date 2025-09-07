import express from 'express';
const { v4: uuidv4 } = require('uuid');
const { bcrypt, hash } = require('bcrypt');

const router = express.Router();

router.get('/auth/login');

router.get('/auth/signup');

router.get('/user/profile');

export default router;