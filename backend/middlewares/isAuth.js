import jwt from 'jsonwebtoken';

const isAuth = async (req,res,next) =>{
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized, please login"
            })
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        if(!decodedToken){
            return res.status(401).json({
                success: false,
                message: "Invalid token, please login again"
            });
        }

        req.user = decodedToken.userId; 
        next();
        
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export default isAuth;
