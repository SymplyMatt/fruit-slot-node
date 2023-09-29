import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import AuthenticatedRequest from '../config/authenticatedRequst';
import sendResponse from '../config/sendResponse';

const imageLimit = (req : AuthenticatedRequest, res :Response, next : NextFunction) => {
    const imageSize : any = req.file?.size ?? 0;
    if(imageSize <= 2097152 ){
        next()
    }else{
        return sendResponse(res, 400, "Photo size must not exceed 2MB");
    }
}

export default imageLimit