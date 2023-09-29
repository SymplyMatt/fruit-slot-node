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

export default async function getMonthlyBookingStats ( req : AuthenticatedRequest, res : Response) {
    try {
        let presentMonthTimeStamp = getStartAndEndOfMonth();
        let bookingDocument : Model<BookingModel> = Booking;
        let allBookings : Array<BookingModel> = await bookingDocument.find();
        let allPresentMonthBookings : Array<BookingModel> = allBookings.filter(item => (item.createdAt.getTime() >= presentMonthTimeStamp.start && item.createdAt.getTime() <= presentMonthTimeStamp.end));
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const bookingsStat : Array<DailyBookings> = [];
        const months = [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
        ];
        for (let index = 1; index <= currentDay; index++) {
            const allDayBookings : Array<BookingModel>= allPresentMonthBookings.filter(item => item.createdAt.getDate() === index);
            
            bookingsStat.push({
                day:`${months[currentMonth]} ${index}`,
                totalBookings: allDayBookings.length,
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