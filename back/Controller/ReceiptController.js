cd bimport { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import {randomUUID} from 'crypto'
export const createReceipt = async (req , res) => {
    const {expenseId, storagePath, filename, mimeType, fileSize} = req.body;    
    console.log(req.body);
    
    try{
        const newReceipt = await prisma.receipts.create({
            data: {
             receipt_id : randomUUID(),
             expense_id: expenseId,
             storage_path: storagePath,
             filename: filename,
             mime_type: mimeType,
             file_size: fileSize
            }
        })
        console.log("Receipt created succesfully!");
        res.send(newReceipt).status(201)
    } catch(err){
        console.error(err);
        res.status(400).send(err);
    }
}

export const getReceiptById = async (req , res) => {
    console.log("rere");
    
    const receiptId = req.params.id;
    console.log(receiptId);
    
    try{
        const receipt = await prisma.receipts.findUnique({
            where: {
                receipt_id : receiptId
            }
        })
        res.send(receipt);
    } catch(err) {
        console.error(err);
        res.send(err);
    }
}