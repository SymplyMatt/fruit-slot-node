import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import mongoose, { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import Booking, { BookingModel } from '../../../models/Booking';
import { BookingStats, DailyBookings, UserGrowthStats, UsersStats } from '../../../config/stats';
import getStartAndEndOfWeek, { getStartAndEndOfMonth, getStartAndPresentDayOfLastMonth } from '../../../config/monthAndWeekTimeStamps';
import User, { UserModel } from '../../../models/User';
import { calculateGrowthRate } from '../../../config/statsCalculations';

export default async function getWeekBookingStats ( req : AuthenticatedRequest, res : Response) {
    try {
        let presentWeekTimeStamp = getStartAndEndOfWeek();
        let bookingDocument : Model<BookingModel> = Booking;
        let allBookings : Array<BookingModel> = await bookingDocument.find();
        let allPresentWeekBookings : Array<BookingModel> = allBookings.filter(item => (item.createdAt.getTime() >= presentWeekTimeStamp.start && item.createdAt.getTime() <= presentWeekTimeStamp.end));
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        const bookingsStat : Array<DailyBookings> = [];

        for (let index = 0; index <= currentDay; index++) {
            const allDayBookings : Array<BookingModel>= allPresentWeekBookings.filter(item => item.createdAt.getDay() === index);
            const successfulBooking : Array<BookingModel>= allDayBookings.filter(item => item.status == 'successful');
            const pendingBooking : Array<BookingModel>= allDayBookings.filter(item => item.status == 'pending');
            const cancelledBooking : Array<BookingModel>= allDayBookings.filter(item => item.status == 'cancelled');
            const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ]  
            bookingsStat.push({
                day:days[index],
                totalBookings: allDayBookings.length,
                successfulBookings: successfulBooking.length,
                pendingBookings: pendingBooking.length,
                cancelledBookings: cancelledBooking.length,
            })          
        }
        
        sendResponse(res, 201,'Success!', bookingsStat);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}