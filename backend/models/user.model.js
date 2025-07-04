import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        default: "Anonymous"
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dixpqopet/image/upload/v1751643692/i08qrsvhkmaqrpngcnea.png",
    },
    publicId:{
        type: String,
        default: ""
    }

},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;