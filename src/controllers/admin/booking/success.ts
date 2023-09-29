import { Router, Request, Response } from 'express';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import findOne from '../../../config/findOne';
import { BookingModel } from '../../../models/Booking';
import sendBookingInfo from '../../../config/sendBookingInfo';

export default async function setBookingStatus ( req : AuthenticatedRequest, res : Response) {
    try {
        let foundItem : BookingModel = await findOne('booking', {_id : req.body.bookingId});
        if(!foundItem) return sendResponse(res, 401,'Booking not found!');

        foundItem.status = req.body?.status || foundItem.status;
        foundItem.save();
        sendResponse(res, 201,'Success!', sendBookingInfo(foundItem));
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}