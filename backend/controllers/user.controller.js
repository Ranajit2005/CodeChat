import User from "../models/user.model.js";


export const getCurrentUser = async (req, res) =>{
    try {
        const userId = req.user;
        
        const user = await User.findById(userId).select("-password");

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found, please login again"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
        
    } catch (error) {
        console.error("Error fetching current user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });   
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name, image, publicId, bio } = req.body;
        const userId = req.user;
        
        const user = await User.findByIdAndUpdate(userId,{
            name,
            image,
            publicId,
            bio
        },{new:true});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found, please login again"
            });
        }

        return res.status(200).json({
            success: true,
            user,
            message: "Profile updated successfully",
        })

    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getOtherUser = async (req,res) => {
    try {
        const otherUsers = await User.find({
            _id: { $ne: req.user }
        }).select("-password");

        return res.status(200).json({
            success: true,
            otherUsers
        });

    } catch (error) {
        console.error("Error fetching other users:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}