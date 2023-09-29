import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import uploadImage from '../../../config/cloudinary';
import sendItemInfo from '../../../config/sendAcceptableItemInfo';
import sendBookingInfo from '../../../config/sendBookingInfo';
import Booking, { BookingModel } from '../../../models/Booking';

export default async function getAllCancelledBookings ( req : AuthenticatedRequest, res : Response) {
    try {
        let document : Model<BookingModel> = Booking;
        let allItems : Array<BookingModel> = await document.where('status').equals('cancelled');
        let array: Array<any> =  allItems.map(item => sendBookingInfo(item));
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