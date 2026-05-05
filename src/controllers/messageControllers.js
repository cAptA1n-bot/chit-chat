import messageServices from "../services/messageServices.js";

const sendMessage = async (req, res) => {
    try{
        const {receiverId, content} = req.body;
        const senderId = req.user.id;
        if(!receiverId, !content){
            return res.status(400).json({message: "Not enough details provided"})
        }
        if(typeof(receiverId) !== "number" && typeof(content) !== "string"){
            return res.status(400).json({message: "Invalid information"});
        }
        await messageServices.sendMessage(senderId, receiverId, content);
        res.status(204).send();
    }
    catch(err){
        console.log(err);
        if(err?.status == 404){
            return res.status(404).json({message: err.message});
        }
        res.status(400).json({message: "Something went wrong", error: err.message})
    }
}

export default {sendMessage};