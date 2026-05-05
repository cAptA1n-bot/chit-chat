import { pool } from "../database/pg.js"
import Chat from "../models/chat.js";

const sendMessage = async (senderId, receiverId, content) => {
    let result = await pool.query(
        `SELECT * FROM users
        WHERE id = $1`,
        [receiverId]
    )
    result = result.rows[0];
    if(!result){
        throw new Error({status: 404, message: 'User not found'});
    }
    await Chat.create({senderId, receiverId, content});
    return;
}

export default {sendMessage}