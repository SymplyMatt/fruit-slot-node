import { Router, Request, Response } from 'express';
import User, { UserModel } from '../../../models/User';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import genToken from '../../../config/jwtGen';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import findOne from '../../../config/findOne';
import sendUserInfo from '../../../config/sendUserInfo';

export default async function login ( req : Request, res : Response) {

    try {
        let foundUser : UserModel = await findOne("user", {email : req.body.email});
        if(!foundUser) return sendResponse(res, 401, "Incorrect email or password");
        // evaluate password
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if(!match) return sendResponse(res, 400, 'Incorrect email or password!' );
        if(!foundUser.status) return sendResponse(res, 401, 'Your account is currently suspended!' );
        return sendResponse(res, 201, "Login Successful", await sendUserInfo(foundUser, true) );
        
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}