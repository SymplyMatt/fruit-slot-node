import { Router, Request, Response } from 'express';
import User, { UserModel } from '../../../models/User';
import bcrypt from 'bcrypt'
import genHash from '../../../config/hashGen';
import findOne from '../../../config/findOne';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';



export default async function changePassword ( req : AuthenticatedRequest, res : Response) {

    try {
        let foundUser : UserModel = await findOne("user", {_id : req.user});
        if(!foundUser) return sendResponse(res, 401, "User not found!")
        const match = await bcrypt.compare(req.body.oldPassword, foundUser.password);
        if(!match) return sendResponse(res, 401, "Incorrect old password");
        foundUser.password = await genHash(req.body.newPassword);
        foundUser.save();
        return sendResponse(res, 200, 'Password Changed!');
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}