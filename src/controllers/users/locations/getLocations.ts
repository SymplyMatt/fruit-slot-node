import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import uploadImage from '../../../config/cloudinary';
import sendItemInfo from '../../../config/sendAcceptableItemInfo';
import Location, { LocationModel } from '../../../models/Location';
import sendLocationInfo from '../../../config/sendLocationInfo';

export default async function getAllLocations ( req : AuthenticatedRequest, res : Response) {
    try {
        let document : Model<LocationModel> = Location;
        let allItems : Array<LocationModel> = await document.find();
        let array: Array<any> =  allItems.map(item => sendLocationInfo(item));
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