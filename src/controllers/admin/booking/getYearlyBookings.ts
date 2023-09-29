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

export default async function getYearBookingStats ( req : AuthenticatedRequest, res : Response) {
    try {
        let bookingDocument : Model<BookingModel> = Booking;
        let allBookings : Array<BookingModel> = await bookingDocument.find();
        //get the year of the first user
        let userDocument : Model<BookingModel> = User;
        let allUsers : Array<UserModel> = await userDocument.find();
        let firstUserYear : number = allUsers[0].createdAt.getFullYear();
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const bookingsStat : Array<DailyBookings> = [];
        for (let index = firstUserYear; index <= currentYear; index++) {
            const allYearBookings : Array<BookingModel> = allBookings.filter(item => item.createdAt.getFullYear() === index);
            
            bookingsStat.push({
                year:index,
                totalBookings: allYearBookings.length,
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