import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import uploadImage from '../../../config/cloudinary';
import sendItemInfo from '../../../config/sendAcceptableItemInfo';
import Location, { LocationModel } from '../../../models/Location';
import sendLocationInfo from '../../../config/sendLocationInfo';
import User, { UserModel } from '../../../models/User';
import sendUserInfo from '../../../config/sendUserInfo';

export default async function getAllUsers ( req : AuthenticatedRequest, res : Response) {
    try {
        let document : Model<UserModel> = User;
        let allItems : Array<UserModel> = await document.find();
        let allUsers : Array<UserModel> = allItems.filter( item => !item.roles.includes(2001) && !item.roles.includes(2002));
        let array: Array<any> =  allUsers.map(item => sendUserInfo(item));
        let awaitPromise = await Promise.all(array);
        
        sendResponse(res, 201,'Success!', array);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}