import User from '../models/user.model.js'
import bcyrptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
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
        console.log(err);
        // next(errorHandler(550,"Error from the function"));
        next(err);
    }
}
export const signin = async(req,res,next)=>{
    const {email,password} = req.body;
    try {
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404,"User not found"));
        const validPassword = bcyrptjs.compareSync(password,validUser.password);
        if(!validPassword) return next (errorHandler(401,"Wrong credentials!"));
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password: pass ,...rest} = validUser._doc;
        // removing password from the data
        res.cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest);  // sending user data without the password
    } catch (error) {
        next(error);
    }
}

export const google =  async(req, res, next) => {
    try{
        const user = await User.findOne({ email: req.body.email })
        if(user){
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token,{httpOnly: true})
            .status(200)
            .json(rest)
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bcyrptjs.hashSync(generatedPassword,10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashPassword,
                avatar: req.body.photo
            })
            const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET)
            const {password:pass , ...rest} = newUser._doc;
            res.cookie('access_token',token,{httpOnly: true}).status(200).json(rest); 
        }
    }catch(error) {

    }
}