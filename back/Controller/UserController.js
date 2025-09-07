import { PrismaClient } from '@prisma/client';
const { v4: uuidv4 } = require('uuid');
const { bcrypt} = require('bcrypt');
const id = uuidv4();
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