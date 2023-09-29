import { Router, Request, Response } from 'express';
import User, { UserModel } from '../../../models/User';
import bcrypt from 'bcrypt'
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import { Model } from 'mongoose';
import genHash from '../../../config/hashGen';



export default async function changePassword ( req : AuthenticatedRequest, res : Response) {

    try {
        const userDocument: Model<UserModel> = User;
        // search for duplicate;
        const foundUser : UserModel = await userDocument.findOne({_id : req.user}) as UserModel;
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