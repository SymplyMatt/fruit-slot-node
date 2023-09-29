import { Router, Request, Response } from 'express';
import Location , { LocationModel } from '../../../models/Location';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import sendLocationInfo from '../../../config/sendLocationInfo';

export default async function create ( req : AuthenticatedRequest, res : Response) {
    const {name}  = req.body;
    try {
        const AcceptableItemDocument: Model<LocationModel> = Location;
        // Create a new document
        const newLocation: LocationModel = await Location.create({
            createdBy : req.user,
            name,
        });
        sendResponse(res, 201,'Location created successfully!', await sendLocationInfo(newLocation));
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}