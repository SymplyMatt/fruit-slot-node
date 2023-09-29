import { Router, Request, Response } from 'express';
import User, { UserModel } from '../../../models/User';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import genToken from '../../../config/jwtGen';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import findOne from '../../../config/findOne';
import sendUserInfo from '../../../config/sendUserInfo';

export default async function getUser ( req : Request, res : Response) {

    try {
        let foundUser : UserModel = await findOne("user", {_id : req.query.userId});
        if(!foundUser) return res.sendStatus(400);
        return sendResponse(res, 201, "Success!", await sendUserInfo(foundUser) );
        
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}