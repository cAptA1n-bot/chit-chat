import bcrypt from 'bcrypt';
import { pool } from '../database/pg.js';

const signup = async (firstName, lastName, emailId, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        `INSERT INTO users (firstName, lastName, emailId, password_hash)
        VALUES ($1, $2, $3, $4)
        RETURNING id, firstName, lastName, emailId`,
        [firstName, lastName, emailId, hashedPassword]
    )
    return result;
}

const login = async (emailId, password) => {
    const result = await pool.query(
        `SELECT * FROM users
        WHERE emailId = $1`,
        [emailId]
    )
    const user = result.rows[0];
    if(!user){
        throw new Error("Invalid credentials");
    }
    const verify = bcrypt.compare(password, user.password_hash);
    if(!verify){
        throw new Error("Invalid credentials");
    }
    return user;
}

export default {signup, login};