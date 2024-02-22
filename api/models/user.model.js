import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type : 'string',
        required: true,
    }
},{
    timestamps: true
}) //to save time of creation and time of updation

const User = mongoose.model('User',userSchema);

export default User;