import mongoose, { Date as mongooseDate } from "mongoose";
import { BookingModel } from "../models/Booking";

function formatTimeTo12HourFormat(date: Date): string {
    const timestamp = date.getTime();
    const formattedTime = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(timestamp);
  
    return formattedTime;
  }
  
export type bookingInfo  = {
    id : mongoose.Schema.Types.ObjectId,
    user : mongoose.Schema.Types.ObjectId,
    items : Array<mongoose.Schema.Types.ObjectId>,
    additionalPhone : String,
    pickUpAddress : String,
    pickUpLocation : mongoose.Schema.Types.ObjectId,
    pickUpDate : Date,
    pickUpTime : String,
    bookingDate : any,
    status : String,
    bookingId : Number,
}
export default  function sendBookingInfo(foundItem: BookingModel){
    const item : bookingInfo = {
        id : foundItem._id,
        user : foundItem.createdBy,
        items : foundItem.items,
        additionalPhone : foundItem.additionalPhone,
        pickUpAddress : foundItem.pickUpAddress,
        pickUpLocation : foundItem.pickUpLocation,
        pickUpDate : foundItem.pickUpDate,
        pickUpTime : `${formatTimeTo12HourFormat(foundItem.pickUpTimeOne)} - ${formatTimeTo12HourFormat(foundItem.pickUpTimeTwo)}`,
        bookingDate : foundItem.createdAt,
        status : foundItem.status,
        bookingId : foundItem.bookingId,
        };
    return item
}