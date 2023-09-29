import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import AuthenticatedRequest from '../config/authenticatedRequst';

const verifyJWT = (req : AuthenticatedRequest, res :Response, next : NextFunction) => {
    const authHeader = req?.headers?.authorization || req?.headers?.Authorization as string;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err : any, decoded : any) => {
            
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.user;
            req.email = decoded.UserInfo.email;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

export default verifyJWT