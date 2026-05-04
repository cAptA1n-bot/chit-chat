import { pool } from "../database/pg.js";
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "Unauthorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const result = await pool.query(
            `SELECT * FROM users
            WHERE id = $1`,
        [decoded.id])
        const user = result.rows[0];
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        req.user = user;
        next();
    }
    catch(err){
        res.status(400).json({message: "Something went wrong", error: err.message});
    }
}

export default authMiddleware;