import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bycryptjs from 'bcryptjs'

export const test = (req,res)=>{
    // console.log("req cookies = "+req.cookies)
    res.json({
        msg: "hello world"
    })
};

export const updateUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"You can only update your own account"))
    }
    try {
        if(req.body.password){
            req.body.password = bycryptjs.hashSync(req.body.password,10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.user.id,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        },{ new: true })
        console.log("updatedUser = " + updatedUser);
        const {password , ...rest} = updatedUser._doc;
        res.status(200).json(rest);
        // res.json({updatedUser: updatedUser})
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async(req,res,next)=>{
    if(req.user.id != req.params.id) return next(errorHandler(401,'You can only delete your own account'));

    try {
        await User.findByIdAndDelete(req.params.id,)
        res.clearCookie('access_token')
        res.status(200).json("User has been deleted")
    } catch (error) {
        next(error);
    }
}
export const getUserListing = async (req, res, next) => {
    if(req.params.id === req.user.id){
        try {
            const listings = await Listing.find({userRef: req.params.id});
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    }else{
        return next(errorHandler(401,"You can only view ypur own listing"))
    }
}

export const getUser = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user) return next(errorHandler(401,"User not found!"))

        const {password,...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
    
}

