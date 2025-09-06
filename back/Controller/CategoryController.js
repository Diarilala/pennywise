import { PrismaClient } from "@prisma/client";
import express from 'express';

const prisma = new PrismaClient();
const app = express();


app.get("/api/categories", (req, res) => {

});

app.post("/api/categories", (req, res) => {

});