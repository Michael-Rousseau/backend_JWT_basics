import mongoose from "mongoose";
const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, "company"],
        maxLength:50,
    },
     position:{
        type:String,
        required:[true, "position"],
        maxLength:100,
    },
     status:{
         type:String,
         enum:['interview', 'declined', 'pending'],
         default:'pending',
    },
    createdBy:{
      type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true, "created by?"]
    },
}, {timestamps:true})

export const Job = mongoose.model('Job', JobSchema);