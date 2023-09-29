import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import Booking, { BookingModel } from '../../../models/Booking';
import { BookingStats } from '../../../config/stats';
import { getStartAndEndOfMonth } from '../../../config/monthAndWeekTimeStamps';

export default async function getAllUserBookingStats ( req : AuthenticatedRequest, res : Response) {
    try {
        let document : Model<BookingModel> = Booking;
        let allItems : Array<BookingModel> = await document.find();
        const presentMonthTimeStamps = getStartAndEndOfMonth();
        let allPresentMonthItems : Array<BookingModel> = allItems.filter(item => (item.createdAt.getTime() >= presentMonthTimeStamps.start && item.createdAt.getTime() <= presentMonthTimeStamps.end));
        let pendingBookings : Array<BookingModel> = allPresentMonthItems.filter(item => item.status == 'pending');
        let cancelledBookings : Array<BookingModel> = allPresentMonthItems.filter(item => item.status == 'cancelled');
        let successfulBookings : Array<BookingModel> = allPresentMonthItems.filter(item => item.status == 'successful');
        const bookingStats : BookingStats = {
            totalBookings : allPresentMonthItems.length,
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