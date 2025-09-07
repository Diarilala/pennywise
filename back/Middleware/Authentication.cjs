const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;

export function generateAccessToken(username) {
    return jwt.sign({ username }, process.env.TOKEN_SECRET, {expiresIn:'86400s'})
}
