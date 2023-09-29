import { Router, Request, Response } from 'express';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import Booking, { BookingModel } from '../../../models/Booking';
import generateId from '../../../config/generateId';
import sendBookingInfo, { bookingInfo } from '../../../config/sendBookingInfo';
import AcceptableItem, { AcceptableItemModel } from '../../../models/AcceptableItem';
import findOne from '../../../config/findOne';
import Location, { LocationModel } from '../../../models/Location';
import User, { UserModel } from '../../../models/User';
import sendEmail from '../../../config/sendEmail';

export default async function create ( req : AuthenticatedRequest, res : Response) {
    const {items, additionalPhone,pickUpAddress, pickUpLocation,pickUpDate, pickUpTimeOne, pickUpTimeTwo}  = req.body;
    try {
        let errs :Array<String>= [];
        let selectedItems : Array<string> = [];
        //items validation;
        const itemsValidation = items.map(async(item : any) =>{
            const document: Model<AcceptableItemModel> = AcceptableItem;
            const foundItem : AcceptableItemModel | string = await document.findOne({_id : item}).exec() as AcceptableItemModel;
            if(!foundItem) errs.push(`invalid item: ${item}`); 
            selectedItems.push(foundItem.name as string);
        })
        const awaitItemsValidation = await Promise.all(itemsValidation);
        if(errs.length > 0) return sendResponse(res, 401, errs[0]);
        //location validation;
        const document: any = Location;
        const foundLocation : LocationModel | string = await document.findOne({_id : pickUpLocation}).exec() as LocationModel;
        if(!foundLocation) return sendResponse(res, 401, `invalid location`); 

        let bookingId : Number;
        bookingId = await generateId("booking") as Number;
        const bookingDocument: Model<BookingModel> = Booking;
        // Create a new document
        const newBooking: BookingModel = await bookingDocument.create({
            createdBy : req.user,
            items,
            additionalPhone,
            pickUpAddress,
            pickUpLocation,
            pickUpDate,
            pickUpTimeOne,
            pickUpTimeTwo,
            bookingId
        });
        let newBookingInfo : bookingInfo = sendBookingInfo(newBooking);
        sendResponse(res, 201,'Booking created successfully!', newBookingInfo);

        // send new booking info to all admins;
        let userDocument : Model<UserModel> = User;
        let allUsers : Array<UserModel> = await userDocument.find();
        let userInfo : UserModel | null= await userDocument.findOne({_id : req.user});
        let allAdmins : Array<UserModel> = allUsers.filter( item => item.roles.includes(2001) || item.roles.includes(2002));
        let allAdminEmailAddresses : Array<string> = allAdmins.map(i => i.email);
        const emailOutput = `
                <h4>New Booking Created! </h4>
                <p>User:  ${userInfo?.fullName}</p>
                <p>Phone :  ${userInfo?.phone}</p>
                <p>Additional Phone :  ${newBookingInfo.additionalPhone}</p>
                <p>BookingId :  ${newBookingInfo.bookingId}</p>
                <p>Pick Up Address :  ${newBookingInfo.pickUpAddress}</p>
                <p>Pick Up Date :  ${newBookingInfo.pickUpDate}</p>
                <p>Pick Up Time range :  ${newBookingInfo.pickUpTime}</p>
                <p>Cover Area :  ${foundLocation.name}</p>
                <p>Items :  ${selectedItems.map((i,index) => {
                    if(index == 0) return `${i}`;
                    return ` ${i}`;
                })}</p>
        `
        sendEmail('Booking notification', emailOutput, [userInfo?.email || '',...allAdminEmailAddresses]);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}