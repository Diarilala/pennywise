import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const app = express();

async function checkData(req, res, next) {
    try{
        const users = await prisma.user.findMany();
        console.log('Users:', users);
        
    }  catch(err){
        console.error(err);        
    }
    res.send()
    next()
}

app.get("/users", checkData);

app.listen(3000, () => {
    console.log("Listening to port 3000");
    
})