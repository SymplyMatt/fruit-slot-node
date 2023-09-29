import { Router, Request, Response } from 'express';
import User, { UserModel } from '../../../models/User';
import findOne from '../../../config/findOne';
import sendResponse from '../../../config/sendResponse';
import sendUserInfo from '../../../config/sendUserInfo';

interface AuthenticatedRequest extends Request {
    user?: string,
    email?: string,
  }

export default async function getUserInfo ( req : AuthenticatedRequest, res : Response) {

    try {
        let foundUser : UserModel = await findOne("user", {_id : req.user});
        if(!foundUser) return sendResponse(res, 401, "Invalid User!");
        return sendResponse(res, 201, "Success!", await sendUserInfo(foundUser) );
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}