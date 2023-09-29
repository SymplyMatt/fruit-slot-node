import { Router, Request, Response } from 'express';
import User, { UserModel } from '../../../models/User';
import bcrypt from 'bcrypt'
import genHash from '../../../config/hashGen';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import findOne from '../../../config/findOne';
import sendResponse from '../../../config/sendResponse';



export default async function resetPassword ( req : AuthenticatedRequest, res : Response) {

    try {
        let foundUser : UserModel = await findOne("user", {_id : req.user});
        if(!foundUser) return sendResponse(res, 401, "User does not exist!");
        foundUser.password = await genHash(req.body.newPassword);
        foundUser.save();
        return sendResponse(res, 201, "Password reset successfully!");
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}