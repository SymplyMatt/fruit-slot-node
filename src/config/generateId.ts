import Booking from "../models/Booking";
import User from "../models/User";

export default async function generateId (model = 'user'){
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    let duplicate = false;
    if(model == 'user') duplicate = await User.findOne({userId : randomNumber}).exec();
    if(model == 'booking') duplicate = await Booking.findOne({bookingId : randomNumber}).exec();
    if (duplicate) {
        generateId();
    }else{
        return randomNumber
    }
}

