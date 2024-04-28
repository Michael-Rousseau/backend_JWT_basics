import User from "../models/User";
import jwt from "jsonwebtoken";
import {UnauthenticatedError} from "../errors/unauthenticated";
import {NextFunction, Request, Response} from "express";

interface UserPayload {
  userId: string;
  name: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
export const authentificatedUser = async (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new UnauthenticatedError("bad header");
    }
    const token = authHeader.split(" ")[1];
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET || "") as UserPayload;
        req.user = { userId:payload.userId, name:payload.name};
        next();
    }catch (error){
        throw new UnauthenticatedError("invalid auth");
    }
}