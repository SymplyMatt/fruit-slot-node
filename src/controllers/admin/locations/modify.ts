import { Router, Request, Response } from 'express';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import findOne from '../../../config/findOne';
import { LocationModel } from '../../../models/Location';
import sendLocationInfo from '../../../config/sendLocationInfo';

export default async function modify ( req : AuthenticatedRequest, res : Response) {
    const {name}  = req.body;
    try {
        let foundItem : LocationModel = await findOne('location', {_id : req.body.locationId});
        if(!foundItem) return sendResponse(res, 401,'Item not found!');
        foundItem.name = name;
        foundItem.save();
        sendResponse(res, 201,'Success!', await sendLocationInfo(foundItem));
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}