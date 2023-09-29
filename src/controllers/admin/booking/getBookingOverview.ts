import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import Booking, { BookingModel } from '../../../models/Booking';
import { BookingStats } from '../../../config/stats';
import { getStartAndEndOfMonth } from '../../../config/monthAndWeekTimeStamps';
import { calculateBookingPercentage } from '../../../config/statsCalculations';

export default async function getBookingOverview ( req : AuthenticatedRequest, res : Response) {
    try {
        let document : Model<BookingModel> = Booking;
        let allItems : Array<BookingModel> = await document.find();
        let pendingBookings : Array<BookingModel> = allItems.filter(item => item.status == 'pending');
        let cancelledBookings : Array<BookingModel> = allItems.filter(item => item.status == 'cancelled');
        let successfulBookings : Array<BookingModel> = allItems.filter(item => item.status == 'successful');
        const bookingStats : BookingStats = {
            pendingBookings : calculateBookingPercentage(pendingBookings.length, allItems.length),
            cancelledBookings : calculateBookingPercentage(cancelledBookings.length, allItems.length),
            successfulBookings : calculateBookingPercentage(successfulBookings.length, allItems.length),
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