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
