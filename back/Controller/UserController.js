import { PrismaClient } from '@prisma/client';
const { v4: uuidv4 } = require('uuid');
const { bcrypt} = require('bcrypt');
const id = uuidv4();
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

export async function registerUser(req, res) {
    try {
        const {firstName, lastName, username, email, password} = req.body;
        if (!firstName || !lastName || !username || !password) {
            res.status(400).json({
                error: 'All fields are required',
            })
        }

        const existingUser = prisma.users.findFirst({
            where: {
                OR: [
                    {email: email},
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({
                error: 'User already exists',
            })
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.users.create({
            data: {
                user_id: id,
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: hashedPassword,
                categories: {
                    create: []
                },
                expenses: {
                    create: []
                },
                incomes: {
                    create: []
                }
            },
            include: {
                categories: true,
                expenses: true,
                incomes: true
            }
        });
    }   catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        })
    }
}

export async function loginUser(req, res) {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            res.status(400).json({
                error: 'All fields are required'
            });
        }
        const user = await prisma.users.findUnique({
            where: {username: username}
        });

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            res.status(401).json({
                error: 'Username or password is incorrect'
            })
        }
        const token = jwt.sign({
            userId: user.user_id,
            email: user.email,
            username: user.username
        },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
}

export async function displayProfile(req, res) {
    try {
        const user = await prisma.users.findUnique(
            {
                where: {user_id: req.user.user_id}
            }
        );
        res.status(200).json({
            user
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: 'Internal Server Error',
        })
    }
}