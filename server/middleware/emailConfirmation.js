import User from '../models/user.js';

const emailVerification = async(req, res, next)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({message: "User doesnt exists"}) 
        } else if(user.confirmed){
            next();
        }else{
             return res.status(401).json({message:"Please check your email to verify your account"});
        }
    } catch (error) {
        console.log(error);
    }
}

export default emailVerification;