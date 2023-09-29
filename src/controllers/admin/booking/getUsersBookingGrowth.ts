import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import Booking, { BookingModel } from '../../../models/Booking';
import { BookingStats, GrowthStats } from '../../../config/stats';
import { getStartAndEndOfMonth, getStartAndPresentDayOfLastMonth } from '../../../config/monthAndWeekTimeStamps';
import { calculateGrowthRate } from '../../../config/statsCalculations';


export default async function getAllUserBookingStats ( req : AuthenticatedRequest, res : Response) {
    try {
        let document : Model<BookingModel> = Booking;
        let allItems : Array<BookingModel> = await document.find();
        const lastMonthTimeStamps = getStartAndPresentDayOfLastMonth();
        const presentMonthTimeStamps = getStartAndEndOfMonth();
        let allLastMonthItems : Array<BookingModel> = allItems.filter(item => (item.createdAt.getTime() >= lastMonthTimeStamps.start && item.createdAt.getTime() <= lastMonthTimeStamps.end));
        let allPresentMonthItems : Array<BookingModel> = allItems.filter(item => (item.createdAt.getTime() >= presentMonthTimeStamps.start && item.createdAt.getTime() <= presentMonthTimeStamps.end));
        let lastMonthPendingBookings : Array<BookingModel> = allLastMonthItems.filter(item => item.status == 'pending');
        let presentMonthPendingBookings : Array<BookingModel> = allPresentMonthItems.filter(item => item.status == 'pending');
        let lastMonthCancelledBookings : Array<BookingModel> = allLastMonthItems.filter(item => item.status == 'cancelled');
        let presentMonthCancelledBookings : Array<BookingModel> = allPresentMonthItems.filter(item => item.status == 'cancelled');
        let lastMonthSuccessfulBookings : Array<BookingModel> = allLastMonthItems.filter(item => item.status == 'successful');
        let presentMonthSuccessfulBookings : Array<BookingModel> = allPresentMonthItems.filter(item => item.status == 'successful');
        const growthStats : GrowthStats = {
            totalBookingsGrowth : calculateGrowthRate(allLastMonthItems.length,allPresentMonthItems.length),
            pendingBookingsGrowth : calculateGrowthRate(lastMonthPendingBookings.length,presentMonthPendingBookings.length),
            cancelledBookingsGrowth : calculateGrowthRate(lastMonthCancelledBookings.length, presentMonthCancelledBookings.length),
            successfulBookingsGrowth : calculateGrowthRate(lastMonthSuccessfulBookings.length, presentMonthSuccessfulBookings.length),
        } 
        sendResponse(res, 201,'Success!', growthStats);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}