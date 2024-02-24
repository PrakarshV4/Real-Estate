import User from '../models/user.model.js'
import bcyrptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
export const signup = async(req,res,next)=>{
    //info from req.body
    const {username,email,password} = req.body;
    const hashPassword = bcyrptjs.hashSync(password,10);
    const newUser = new User({username, email, password: hashPassword});
    try{
        await newUser.save();
        res.status(200).json({msg:'User created successfully'});
    }catch(err){
        next(errorHandler(550,"Error from the function"));
    }
}