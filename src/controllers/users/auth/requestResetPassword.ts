import { Router, Request, Response } from 'express';
import User, { UserModel } from '../../../models/User';
import genToken from '../../../config/jwtGen';
import sendEmail from '../../../config/sendEmail';
import sendResponse from '../../../config/sendResponse';
import { Model } from 'mongoose';



export default async function requestResetPassword ( req : Request, res : Response) {

    try {
        const userDocument: Model<UserModel> = User;
        // search for duplicate;
        const foundUser : UserModel = await userDocument.findOne({email : req.body.email}) as UserModel;
        if(!foundUser) return sendResponse(res, 401, "User does not exist")
        // jwt
        const accessToken = await genToken({
            user : foundUser._id,
            email : foundUser.email
        }, '30m');
    
        res.status(200).json({
            requestSuccessful : true,
            message : "Password reset link has been sent to " + req.body.email,
        });
        
        const emailOutput = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                a{
                    text-decoration : none;
                }
                button {
                appearance: none;
                background-color: #2ea44f;
                border: 1px solid rgba(27, 31, 35, .15);
                border-radius: 6px;
                box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
                box-sizing: border-box;
                color: white;
                cursor: pointer;
                display: inline-block;
                font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
                font-size: 14px;
                font-weight: 600;
                line-height: 20px;
                padding: 6px 16px;
                position: relative;
                text-align: center;
                text-decoration: none;
                user-select: none;
                -webkit-user-select: none;
                touch-action: manipulation;
                vertical-align: middle;
                white-space: nowrap;
                }
                button:focus:not(:focus-visible):not(.focus-visible) {
                box-shadow: none;
                outline: none;
                }
                button:hover {
                background-color: #2c974b;
                }
                button:focus {
                box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
                outline: none;
                }
                button:disabled {
                background-color: #94d3a2;
                border-color: rgba(27, 31, 35, .1);
                color: white;
                cursor: default;
                }
                button:active {
                background-color: #298e46;
                box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
                }
            
            </style>
        </head>
        <body>
            <h1>Click this button to reset your password. Link expires after 30 minutes.</h1>
            <button><a href=${foundUser?.roles?.includes(2001) ? 'https://gjc-admin.vercel.app/reset/'+ accessToken: "https://gjc-delta.vercel.app/reset/" + accessToken}>Click</a></button>
        </body>
        </html>
        `
        sendEmail('Password reset', emailOutput, foundUser.email);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}