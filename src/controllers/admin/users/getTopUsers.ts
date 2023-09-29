import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import uploadImage from '../../../config/cloudinary';
import sendItemInfo from '../../../config/sendAcceptableItemInfo';
import sendBookingInfo from '../../../config/sendBookingInfo';
import Booking, { BookingModel } from '../../../models/Booking';
import User, { UserModel } from '../../../models/User';

export default async function getTopUsers ( req : AuthenticatedRequest, res : Response) {
    try {
        let topUsers;
        let userDocument : Model<UserModel> = User;
        let users : Array<UserModel> = await userDocument.find();
        let allUsers : Array<UserModel> = users.filter( item => !item.roles.includes(2001) && !item.roles.includes(2002));
        //get booking number for each user
        let document : Model<BookingModel> = Booking;
        let userBookingNumber = allUsers.map(async user =>{
            let allBookings : Array<BookingModel> = await document.where('createdBy').equals(user._id);
            return {
                user: user?._id,
                totalBookings: allBookings?.length
            }
        });
        let awaitPromises = await Promise.all(userBookingNumber).then(value =>{
            topUsers = value.sort((a : any, b : any) => a?.totalBookings < b?.totalBookings ? 1 : a?.totalBookings > b?.totalBookings ? -1 : 0 ); 
        });
        sendResponse(res, 201,'Success!', topUsers);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}