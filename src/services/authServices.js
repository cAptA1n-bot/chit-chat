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

export default {signup};