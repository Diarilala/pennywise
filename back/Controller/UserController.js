import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
const id = uuidv4();
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export async function registerUser(req, res) {
    try {
        const {firstName, lastName, username, email, password} = req.body;
        if (!firstName || !lastName || !username || !password) {
            res.status(400).json({
                error: 'All fields are required',
            })
        }

        const existingUser = await prisma.users.findFirst({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return res.status(409).json({
                error: 'User already exists',
            })
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);
        
        const newUser = await prisma.users.create({
            data: {
                user_id: uuidv4(),
                first_name: firstName,
                last_name: lastName,
                email: email,
                password_hash: hashedPassword,
                username: username,
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
        res.send(newUser)
    }   catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        })
    }
}

export async function loginUser(req, res) {
    console.log("Logging in ");
    
    try {
        const {username, password} = req.body;
        console.log("part1");
        
        if (!username || !password) {
            res.status(400).json({
                error: 'All fields are required'
            });
        }
        const user = await prisma.users.findUnique({
            where: {username: username}
        });
            //console.log(user);
            
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            res.status(401).json({
                error: 'Username or password is incorrect'
            })
        }
        console.log("correct");
        
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
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
        });
        console.log("end");
        
      res.status(200).json({
            message: 'Login successful',
            user: {
                userId: user.user_id,
                username: user.username,
                email: user.email
            }
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
        console.log("usererere", req.user.userId);
        
        const user = await prisma.users.findFirst(
            {
                where: {user_id: req.user.userId}
            }
        );
        console.log(user);
        
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