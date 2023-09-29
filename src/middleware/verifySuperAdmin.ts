import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import AuthenticatedRequest from '../config/authenticatedRequst';

const verifySuperAdmin = (req : AuthenticatedRequest, res :Response, next : NextFunction) => {
    if (req.roles?.includes(2002)) {
        next(); //invalid token
    }else{
        return res.sendStatus(403); //not a super admin
    }
}

export default verifySuperAdmin