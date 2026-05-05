import mongoose from "mongoose";

const chatSchema = new Schema({
    senderId: {
        type: Number,
        required: true
    },
    receiverId: {
        type: Number,
        required: true
    },
    content: {
        type: String
    }
}, {timestamps: true});

const chat = mongoose.model("chat", chatSchema);

export default chat;