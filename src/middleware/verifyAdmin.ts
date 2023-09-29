import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import AuthenticatedRequest from '../config/authenticatedRequst';

const verifyAdmin = (req : AuthenticatedRequest, res :Response, next : NextFunction) => {
    if (req.roles?.includes(2001)) {
        next(); //invalid token
    }else{
        return res.sendStatus(403); //not an admin
    }
}

export default verifyAdmin