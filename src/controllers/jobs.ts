import {Response, Request} from "express";
import {Job} from "../models/Jobs";
import {BadRequestError} from "../errors/bad-request";
import {NotFoundError} from "../errors/not-found";
import StatusCodes from "http-status-codes";

export const getAllJobs = async (req: Request, res: Response) => {
    try{
        const AllJobs = await Job.find({createdBy:req.user?.userId}).sort('createdAt');
        res.status(StatusCodes.OK).json({AllJobs, count: AllJobs.length});
    }catch(err){
        console.error(err);
    }
}

export const getJobs = async (req: Request, res: Response) => {
    try{
        const { params:{id: jobId}} = req;
        const job = await Job.findById({_id: jobId, createdBy:req.user?.userId});
        if(!job)
            throw new NotFoundError(`no job ${jobId}`);
        res.status(StatusCodes.OK).json({job});
    }catch(err)
    {
        console.error(err);
    }
}
export const createJob = async (req: Request, res: Response) => {
    try {
        req.body.createdBy = req.user?.userId;
        const job = await Job.create(req.body);
        res.status(StatusCodes.CREATED).json({job});
    }catch(err)
    {
        console.log(err);
    }
}
export const UpdateJob = async (req: Request, res: Response) => {
    try{
        const{
            body:{company, position},
            params: {id: jobId},
        } = req;
        if(company === '' || position === "")
            throw new BadRequestError("one empty");
        const job = await Job.findOneAndUpdate({_id:jobId, createdBy:req.user?.userId}, req.body, {new:true, runValidators:true});
        if(!job)
            throw new BadRequestError("doesnt exist");
        res.status(StatusCodes.CREATED).json({job});
    }catch (err)
    {console.error(err);}
}
export const DeleteJob = async (req: Request, res: Response) => {
    try{
        const{
            body:{company, position},
            params: {id: jobId},
        } = req;
        const job = await Job.findOneAndDelete({_id:jobId, createdBy:req.user?.userId});
        if(!job)
            throw new BadRequestError("doesnt exist");
        res.status(StatusCodes.CREATED).json({job});
    }catch (err)
    {console.error(err);}
}
