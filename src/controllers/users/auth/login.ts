import { Router, Request, Response } from 'express';
import User, { UserModel } from '../../../models/User';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import genToken from '../../../config/jwtGen';

export default async function login ( req : Request, res : Response) {

    try {
        const userDocument: Model<UserModel> = User;
        // search for duplicate;
        const foundUser : UserModel = await userDocument.findOne({email : req.body.email}) as UserModel;
        if(!foundUser) return sendResponse(res, 401, "Incorrect email or password");
        // evaluate password
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if(!match) return sendResponse(res, 400, 'Incorrect email or password!' );
        if(!foundUser.status) return sendResponse(res, 401, 'Your account is currently suspended!' );
        const token = await genToken({
            user : foundUser._id,
            email : foundUser.email,
            roles : foundUser.roles
        }, '30m');
        const regUser = {
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email,
            phone: foundUser.phone,
            token
        };
        return sendResponse(res, 201, "Login Successful", regUser);
        
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}