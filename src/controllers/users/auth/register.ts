import { Router, Request, Response } from 'express';
import User , { UserModel } from '../../../models/User';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import genHash from '../../../config/hashGen';
import genToken from '../../../config/jwtGen';
import sendEmail from '../../../config/sendEmail';
import generateUserId from '../../../config/generateId';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import sendUserInfo from '../../../config/sendUserInfo';

export default async function register ( req : Request, res : Response) {
    const {fullName,password,email, phone}  = req.body;
    try {
        let userId : Number;
        userId = await generateUserId() as Number;
        const userDocument: Model<UserModel> = User;
        // search for duplicate;
        const duplicate : UserModel = await userDocument.findOne({email}).collation({locale : 'en', strength: 2}).lean().exec() as UserModel;
        if(duplicate) return sendResponse(res, 401, 'User already exists with that email');
        // Create a new document
        const newUser: UserModel = await userDocument.create({
            fullName,
            email,
            phone,
            'password' : await genHash(password),
            userId
        });
        const token = await genToken({
            user : newUser._id,
            email : newUser.email,
            userId : newUser.userId,
            roles : newUser.roles
        }, '30m')
        sendResponse(res, 201,'Account created successfully!', await sendUserInfo(newUser, true));
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
            <h1>Click this button to verify your account. Link expires after 30 minutes.</h1>
            <button><a href=${newUser?.roles?.includes(2001) ? 'https://gjc-admin.vercel.app/dashboard/verify' + token : 'https://gjc-delta.vercel.app/dashboard/verify' + token}>Click</a></button>
        </body>
        </html>
        `
        sendEmail('Email Verification', emailOutput, email);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}