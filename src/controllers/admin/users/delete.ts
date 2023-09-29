import { Router, Request, Response } from 'express';
import User, { UserModel } from '../../../models/User';
import uploadImage from '../../../config/cloudinary';
import findOne from '../../../config/findOne';
import sendResponse from '../../../config/sendResponse';
import sendUserInfo from '../../../config/sendUserInfo';


interface AuthenticatedRequest extends Request {
    user?: string,
    email?: string,
}

export default async function deleteUser ( req : AuthenticatedRequest, res : Response) {
    const {userId } = req.body;
    try {
        let foundUser : UserModel = await findOne("user", {_id : userId});
        if(!foundUser) return sendResponse(res, 401, "Invalid User!");
        // modify user info
        const awaitDelete = foundUser.deleteOne();
        sendResponse(res, 201, "Success!");
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}