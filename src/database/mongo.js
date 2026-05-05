import mongoose from "mongoose";

const chatSchema = new Schema({
    senderId: {
        type: Number,
        require: true
    },
    receiverId: {
        type: Number,
        require: true
    },
    content: {
        type: String,
        require: true
    }
}, {timestamps: true});

const chat = mongoose.model("chat", chatSchema);

export default chat;