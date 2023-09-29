import { Router, Request, Response } from 'express';
import User from '../../../models/User';
import AuthenticatedRequest from '../../../config/authenticatedRequst';


export default async function verifyEmail ( req : AuthenticatedRequest, res : Response) {

    try {
        const foundUser = await User.findOne({_id : req.user}).exec();
        if(!foundUser) return res.status(400).json({
            requestSuccessful : false,
            message : "User does not exist!"
        });
        // save user as verified
        foundUser.verified = true;
        foundUser.save();

        res.status(200).json({
            requestSuccessful : true,
            message : "Success!",
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}