import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import uploadImage from '../../../config/cloudinary';
import sendItemInfo from '../../../config/sendAcceptableItemInfo';
import findOne from '../../../config/findOne';
import { BookingModel } from '../../../models/Booking';
import sendBookingInfo from '../../../config/sendBookingInfo';

export default async function getBooking ( req : AuthenticatedRequest, res : Response) {
    try {
        // Create a new document
        let foundItem : BookingModel = await findOne('booking', {_id : req.query.bookingId});
        if(!foundItem) return sendResponse(res, 401,'Booking not found!');
        sendResponse(res, 201,'Success!', await sendBookingInfo(foundItem));
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}