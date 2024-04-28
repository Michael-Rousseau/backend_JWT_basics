import {Response, Request} from "express";
import {StatusCodes} from "http-status-codes";
import {BadRequestError} from "../errors/bad-request";
import {UnauthenticatedError} from "../errors/unauthenticated";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt, {compare} from "bcrypt";


export const register = async (req: Request, res: Response) => {
    try {
        const user = await User.create({...req.body});
        const token = jwt.sign({userId:user._id, name:user.name},process.env.JWT_SECRET || '', {expiresIn:process.env.JWT_LIFE || ''});
        res
            .status(StatusCodes.CREATED)
            .json({user:{name: user.name}, token});
    }catch (err){
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json(req.body);
    }
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    if(!email || !password)
        throw new BadRequestError("no email or passwd");
    const user = await User.findOne({email});

    if(!user)
        throw new UnauthenticatedError("no user?");
    const token = jwt.sign({userId:user._id, name:user.name},process.env.JWT_SECRET || '', {expiresIn:process.env.JWT_LIFE || ''});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
        throw new UnauthenticatedError("incorrect password");
    res.status(StatusCodes.OK).json({user: {name: user.name}, token});
}