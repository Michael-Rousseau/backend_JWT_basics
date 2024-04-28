import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "NOT EMPTY"],
        trim:true,
        minLength:4,
        maxLength:[50, "TOO LONG"],
    },
    email:{
        type:String,
        required:[true, "NOT EMPTY"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "NOT EMPTY"],
        trim:true,
        minLength:8,
    },
});

UserSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id, name:this.name},process.env.JWT_SECRET || '', {expiresIn:process.env.JWT_LIFE || ''});
}

UserSchema.methods.comparePassword = async function (candidate:string){
    return await bcrypt.compare(candidate, this.password);
}

const User = mongoose.model('User', UserSchema);

export default User;
