import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReciverSocketId, io } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
    try {
        // const userId = req.user;
        const sender = req.user;
        const { receiver } = req.params;
        const { message,image } = req.body;
        
        // Here we just create a new message
        const newMessage = await Message.create({
            sender,receiver,message,image
        })

        // We check that they are previously in conversation, checking the participants array
        let conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        })

        // If they can are not in conversation means they are new, so we create a new conversation, else we just push the new message to the existing conversation
        if(!conversation){
            conversation = await Conversation.create({
                participants: [sender, receiver],
                messages: [newMessage._id]
            })
        }else{  // If we find conversation, it returns an array of messages objects, so we just push the new message id to the messages array and save it
            conversation.messages.push(newMessage._id);
            await conversation.save();
        }

        const reciverSocketId = getReciverSocketId(receiver);

        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMsg",newMessage)
        }

        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            newMessage
        });
        
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export const getMessages = async (req,res) => {
    try {
        let conversation = await Conversation.findOne({
            participants: { $all: [req.user, req.params.receiver] }
        }).populate("messages");

        if(!conversation){
            return res.status(404).json({
                success: false,
                message: "No conversation found with this user"
            });
        }

        return res.status(200).json({
            success: true,
            messages: conversation?.messages
        });
        
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}