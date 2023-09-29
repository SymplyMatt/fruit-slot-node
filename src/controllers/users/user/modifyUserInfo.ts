import { Router, Request, Response } from 'express';
import User, { UserModel } from '../../../models/User';
import uploadImage from '../../../config/cloudinary';
import sendResponse from '../../../config/sendResponse';
import { Model } from 'mongoose';


interface AuthenticatedRequest extends Request {
    user?: string,
    email?: string,
    roles?: Array<number>,
}

export default async function modifyUserInfo ( req : AuthenticatedRequest, res : Response) {
    const {email, phone, firstName, lastName} = req.body;
    try {
        const userDocument: Model<UserModel> = User;
        // search for duplicate;
        const foundUser : UserModel = await userDocument.findOne({_id : req.user}) as UserModel;
        if(!foundUser) return sendResponse(res, 401, "Invalid User!");
        if(req.user != foundUser._id) return sendResponse(res, 401, "Unauthorized!");
        // modify user info
        foundUser.email = email || foundUser.email;
        foundUser.phone = phone || foundUser.phone;
        foundUser.firstName = firstName || foundUser.phone;
        foundUser.lastName = lastName || foundUser.phone;
        foundUser.save();
        sendResponse(res, 201, "Success!", foundUser);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}