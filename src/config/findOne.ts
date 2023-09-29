import { Model, Schema } from "mongoose";
import sendResponse from "./sendResponse";
import User, { UserModel } from "../models/User";
import AcceptableItem, { AcceptableItemModel } from "../models/AcceptableItem";
import Location, { LocationModel } from "../models/Location";
import Booking, { BookingModel } from "../models/Booking";

export default async function findOne(model : string,propertyAndValue : any ) : Promise<any>{
    if(model == 'user'){
        const document: Model<UserModel> = User;
        const foundItem : UserModel | string = await document.findOne(propertyAndValue).exec() as UserModel;
        return foundItem
    } 
    if(model == 'item'){
        const document: Model<AcceptableItemModel> = AcceptableItem;
        const foundItem : AcceptableItemModel | string = await document.findOne(propertyAndValue).exec() as AcceptableItemModel;
        return foundItem
    } 
    if(model == 'location'){
        const document: Model<LocationModel> = Location;
        const foundItem : LocationModel | string = await document.findOne(propertyAndValue).exec() as LocationModel;
        return foundItem
    } 
    if(model == 'booking'){
        const document: Model<BookingModel> = Booking;
        const foundItem : BookingModel | string = await document.findOne(propertyAndValue).exec() as BookingModel;
        return foundItem
    } 
}