import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import mongoose, { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import Booking, { BookingModel } from '../../../models/Booking';
import { BookingStats, UsersStats } from '../../../config/stats';
import { getStartAndEndOfMonth } from '../../../config/monthAndWeekTimeStamps';
import User, { UserModel } from '../../../models/User';

export default async function getAllUserStats ( req : AuthenticatedRequest, res : Response) {
    try {
        //get all new users for the month
        let document : Model<UserModel> = User;
        let allItems : Array<UserModel> = await document.find();
        const presentMonthTimeStamps = getStartAndEndOfMonth();
        let allPresentMonthUsers : Array<UserModel> = allItems.filter(item => (item.createdAt.getTime() >= presentMonthTimeStamps.start && item.createdAt.getTime() <= presentMonthTimeStamps.end));

        //get all active users for the month
        let bookingDocument : Model<BookingModel> = Booking;
        let allBookings : Array<BookingModel> = await bookingDocument.find();
        let allPresentMonthBookings : Array<BookingModel> = allBookings.filter(item => (item.createdAt.getTime() >= presentMonthTimeStamps.start && item.createdAt.getTime() <= presentMonthTimeStamps.end));
        let allActiveUsers : Array<any> = [...new Set(allPresentMonthBookings.map(item => String(item.createdBy)))];
        
        const usersStats : UsersStats = {
            newUsers : allPresentMonthUsers.length,
            activeUsers : allActiveUsers.length,
           
        } 
        sendResponse(res, 201,'Success!', usersStats);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}