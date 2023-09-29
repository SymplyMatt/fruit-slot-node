import mongoose from "mongoose";
import { UserModel } from "../models/User";
import genToken from "./jwtGen";
import { AcceptableItemModel } from "../models/AcceptableItem";
import { LocationModel } from "../models/Location";

type locationInfo  = {
    id? : mongoose.Schema.Types.ObjectId,
    name? : String,
}
export default  function sendLocationInfo(foundItem: LocationModel){
    const item : locationInfo = {
        id : foundItem._id,
        name : foundItem.name,
        };
    return item
}