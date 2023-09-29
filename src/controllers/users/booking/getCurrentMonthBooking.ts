import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import uploadImage from '../../../config/cloudinary';
import sendItemInfo from '../../../config/sendAcceptableItemInfo';
import sendBookingInfo from '../../../config/sendBookingInfo';
import Booking, { BookingModel } from '../../../models/Booking';
import { BookingStats } from '../../../config/stats';
import { getStartAndEndOfMonth } from '../../../config/monthAndWeekTimeStamps';

export default async function getCurrentMonthBookingStats ( req : AuthenticatedRequest, res : Response) {
    try {
        let presentMonthTimeStamp = getStartAndEndOfMonth();
        let document : Model<BookingModel> = Booking;
        let allItems : Array<BookingModel> = await document.where('createdBy').equals(req.user);
        let allPresentMonthBookings : Array<BookingModel> = allItems.filter(item => (item.createdAt.getTime() >= presentMonthTimeStamp.start && item.createdAt.getTime() <= presentMonthTimeStamp.end));
        let pendingBookings : Array<BookingModel> = allPresentMonthBookings.filter(item => item.status == 'pending');
        let cancelledBookings : Array<BookingModel> = allPresentMonthBookings.filter(item => item.status == 'cancelled');
        let successfulBookings : Array<BookingModel> = allPresentMonthBookings.filter(item => item.status == 'successful');
        const bookingStats : BookingStats = {
            totalBookings : allItems.length,
            pendingBookings : pendingBookings.length,
            cancelledBookings : cancelledBookings.length,
            successfulBookings : successfulBookings.length,
        } 
        sendResponse(res, 201,'Success!', bookingStats);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}