const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT ;


// Diarilala
app.post("/api/auth/signup", (req, res) => {

});

app.post("/api/auth/login", (req, res) => {

});

app.get("/api/user/profile", (req, res) => {

});

app.put("/api/categories/:id", (req, res) => {

});

app.delete("/api/categories/:id", (req, res) => {

});

// lavorary
app.get("/api/summary", (req, res) => {

});

app.get("/api/summary/monthly", (req, res) => {

});

app.get("/api/summary/alerts", (req, res) => {

});

app.get("/api/categories", (req, res) => {

});

app.post("/api/categories", (req, res) => {

});

// Nathan
app.get("/api/expenses", (req, res) => {

});

app.post("/api/expenses", (req, res) => {

});

app.get("/api/expense/:id", (req, res) => {

});

app.put("/api/expenses/:id", (req, res) => {

});

app.delete("/api/expenses/:id", (req, res) => {

});

app.get("/api/receipts/:id",(req, res) => {

});

// Yohan
app.get("/api/incomes", (req, res) => {

});

app.post("/api/incomes", (req, res) => {

});

app.get("/api/incomes/:id", (req, res) => {

});

app.put("/api/incomes/:id", (req, res) => {

});

app.delete("/api/incomes/:id", (req, res) => {

});

