import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js";

export const createListing = async(req,res,next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}
export const deleteListing = async(req,res,next) => {
    // if(req.params.id !== req.)
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404,"Listing not found!"));
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(401,"You can only delete ypur own listings!"));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing has been deleted");
    } catch (error) {
        next(error)
    } 
}
export const updateListing = async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id);
     if(!listing) return next(errorHandler(404,'Listing not found'));
    //  console.log("req.user.id = "+req.user.id)
    //  console.log("listing.userRef = "+listing.userRef)
     if(req.user.id !== listing.userRef){
        return next(errorHandler(401,'You can edit your own listing'))
     }

     try {
        const updateListing = Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        re.status(200).json(updateListing);
     } catch (error) {
        next(error);
     }
}