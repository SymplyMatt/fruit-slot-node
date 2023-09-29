import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import mongoose, { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import Booking, { BookingModel } from '../../../models/Booking';
import { BookingStats, UserGrowthStats, UsersStats } from '../../../config/stats';
import { getStartAndEndOfMonth, getStartAndPresentDayOfLastMonth } from '../../../config/monthAndWeekTimeStamps';
import User, { UserModel } from '../../../models/User';
import { calculateGrowthRate } from '../../../config/statsCalculations';

export default async function getAllUserGrowthStats ( req : AuthenticatedRequest, res : Response) {
    try {
        //get all new users for the month
        let document : Model<UserModel> = User;
        let allItems : Array<UserModel> = await document.find();
        const lastMonthTimeStamps = getStartAndPresentDayOfLastMonth();
        const presentMonthTimeStamps = getStartAndEndOfMonth();
        let allPastMonthUsers : Array<UserModel> = allItems.filter(item => (item.createdAt.getTime() >= lastMonthTimeStamps.start && item.createdAt.getTime() <= lastMonthTimeStamps.end));
        let allPresentMonthUsers : Array<UserModel> = allItems.filter(item => (item.createdAt.getTime() >= presentMonthTimeStamps.start && item.createdAt.getTime() <= presentMonthTimeStamps.end));

        //get all active users for the month
        let bookingDocument : Model<BookingModel> = Booking;
        let allBookings : Array<BookingModel> = await bookingDocument.find();
        let allPresentMonthBookings : Array<BookingModel> = allBookings.filter(item => (item.createdAt.getTime() >= presentMonthTimeStamps.start && item.createdAt.getTime() <= presentMonthTimeStamps.end));
        let allPastMonthBookings : Array<BookingModel> = allBookings.filter(item => (item.createdAt.getTime() >= lastMonthTimeStamps.start && item.createdAt.getTime() <= lastMonthTimeStamps.end));
        let allPastMonthActiveUsers : Array<any> = [...new Set(allPastMonthBookings.map(item => String(item.createdBy)))];
        let allPresentMonthActiveUsers : Array<any> = [...new Set(allPresentMonthBookings.map(item => String(item.createdBy)))];
        
        const usersGrowthStats : UserGrowthStats = {
            newUsersGrowth : calculateGrowthRate(allPastMonthUsers.length,allPresentMonthUsers.length),
            activeUsersGrowth : calculateGrowthRate(allPastMonthActiveUsers.length,allPresentMonthActiveUsers.length),
        } 
        sendResponse(res, 201,'Success!', usersGrowthStats);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}