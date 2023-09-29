import { Router, Request, Response } from 'express';
import User, { UserModel } from '../../../models/User';
import sendResponse from '../../../config/sendResponse';
import { Model } from 'mongoose';

interface AuthenticatedRequest extends Request {
    user?: string,
    email?: string,
  }

export default async function getUserInfo ( req : AuthenticatedRequest, res : Response) {

    try {
        const userDocument: Model<UserModel> = User;
        // search for duplicate;
        const foundUser : UserModel = await userDocument.findOne({_id : req.user}) as UserModel;
        if(!foundUser) return sendResponse(res, 401, "Invalid User!");
        return sendResponse(res, 201, "Success!", foundUser);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}