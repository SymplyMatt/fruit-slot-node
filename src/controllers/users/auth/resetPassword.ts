import { Router, Request, Response } from 'express';
import User, { UserModel } from '../../../models/User';
import bcrypt from 'bcrypt'
import genHash from '../../../config/hashGen';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import sendResponse from '../../../config/sendResponse';
import { Model } from 'mongoose';



export default async function resetPassword ( req : AuthenticatedRequest, res : Response) {

    try {
        const userDocument: Model<UserModel> = User;
        // search for duplicate;
        const foundUser : UserModel = await userDocument.findOne({_id : req.user}) as UserModel;
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