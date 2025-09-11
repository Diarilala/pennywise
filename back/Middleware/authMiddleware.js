import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const middleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                message: 'No token provided',
            });
        }
        
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;        
        console.log('sersersers', req.user);
        
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({
                message: 'Token expired',
            })
        } else if (error.name === "JsonWebTokenError") {
            return res.status(403).json({
                message: 'Invalid token',
            })
        }
        return res.status(500).json({
            message: 'Internal Server Error',
        })
    }
};

export default middleware