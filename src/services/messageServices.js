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
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }
    await Chat.create({senderId, receiverId, content});
    return;
}

const getMessages = async(recId, userId) => {
    const result = await pool.query(
        `SELECT * FROM users
        WHERE id = $1`,
        [recId]
    )
    if(!result){
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }
    const chat = await Chat.find({$or: [{$and: [{receiverId: recId}, {senderId: userId}]},{$and: [{receiverId: userId}, {senderId: recId}]}]});
    return chat;
}

export default {sendMessage, getMessages}