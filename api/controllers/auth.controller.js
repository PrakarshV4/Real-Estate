import User from '../models/user.model.js'
import bcyrptjs from 'bcryptjs'
export const signup = async(req,res)=>{
    //info from req.body
    const {username,email,password} = req.body;
    const hashPassword = bcyrptjs.hashSync(password,10);
    const newUser = new User({username, email, password: hashPassword});
    try{
        await newUser.save();
        res.status(200).json({msg:'User created successfully'});
    }catch(err){
        res.status(500).json(err.message);
    }
}