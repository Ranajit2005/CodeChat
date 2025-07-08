import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signUp = async (req,res) =>{
    try {
        const {username, email, password} = req.body;

        const checkByUserName = await User.findOne({username})

        if(checkByUserName){
            return res.status(400).json({
                success: false,
                message: "Username already exists, please try username"
            });
        }

        const checkByEmail = await User.findOne({email})

        if(checkByEmail){
            return res.status(400).json({
                success: false,
                message: "Email already exists, please try with other email"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        })

        const token = await genToken(user._id);

        res.cookie("token",token,{
            httpOnly: true,
            secure: false,  //Change in deploy time
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        })

        
    } catch (error) {

        console.error("Error in signUp:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const login = async (req,res) =>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Email not found, please try again"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials, please try again"
            })
        }

        const token = await genToken(user._id);

        res.cookie("token",token,{
            httpOnly: true,
            secure: false,  //Change in deploy time
            sameSite: "Strict", // or "None" if you need cross-site cookies
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })

        return res.status(201).json({
            success: true,
            message: "User login successfully",
            user
        })

        
    } catch (error) {

        console.error("Error in login:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const logout = async (req,res) =>{
    try {
        res.clearCookie("token",{
            httpOnly: true,
            secure: false,  //Change in deploy time
            sameSite: "Strict",
        })

        return res.status(201).json({
            success: true,
            message: "User logout successfully"
        })
        
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
