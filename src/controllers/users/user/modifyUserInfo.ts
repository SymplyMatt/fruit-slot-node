import { Router, Request, Response } from 'express';
import User, { UserModel } from '../../../models/User';
import uploadImage from '../../../config/cloudinary';
import findOne from '../../../config/findOne';
import sendResponse from '../../../config/sendResponse';
import sendUserInfo from '../../../config/sendUserInfo';


interface AuthenticatedRequest extends Request {
    user?: string,
    email?: string,
    roles?: Array<number>,
}

export default async function modifyUserInfo ( req : AuthenticatedRequest, res : Response) {
    const {fullName, email, phone, language, userId, roles } = req.body;
    try {
        let userRoles : Array<Number>;
        let foundUser : UserModel = await findOne("user", {_id : userId ? userId : req.user});
        if(!foundUser) return sendResponse(res, 401, "Invalid User!");
        if(req.user != foundUser._id && !req.roles?.includes(2002) ) return sendResponse(res, 401, "Unauthorized!");
        if(req.roles?.includes(2002)){
            userRoles = roles == 'admin' ? [2000,2001] : roles == 'user' ? [2000] :  foundUser.roles;
        }else{
            userRoles = foundUser.roles;
        } 
        // modify user info
        foundUser.photo = req.file ?  await uploadImage(req.file?.path) : foundUser.photo;
        foundUser.fullName = fullName || foundUser.fullName;
        foundUser.email = email || foundUser.email;
        foundUser.phone = phone || foundUser.phone;
        foundUser.language = language || foundUser.language;
        foundUser.roles = userRoles || foundUser.roles;
        foundUser.save();
        sendResponse(res, 201, "Success!", await sendUserInfo(foundUser));
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}