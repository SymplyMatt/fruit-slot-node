import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import uploadImage from '../../../config/cloudinary';
import sendItemInfo from '../../../config/sendAcceptableItemInfo';
import sendBookingInfo from '../../../config/sendBookingInfo';
import Booking, { BookingModel } from '../../../models/Booking';
import getStartAndEndOfWeek, { TimeStamps } from '../../../config/monthAndWeekTimeStamps';


export default async function getAllNewBookings ( req : AuthenticatedRequest, res : Response) {
    try {
        let document : Model<BookingModel> = Booking;
        let allItems : Array<BookingModel> = await document.where('createdBy').equals(req.user).where('status').equals('pending');
        let newBookings : Array<BookingModel> = allItems.filter(item => (item.createdAt.getTime() >= getStartAndEndOfWeek().start && item.createdAt.getTime() <= getStartAndEndOfWeek().end) )
        let array: Array<any> =  newBookings.map(item => sendBookingInfo(item));
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