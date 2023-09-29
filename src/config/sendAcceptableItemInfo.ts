import mongoose from "mongoose";
import { UserModel } from "../models/User";
import genToken from "./jwtGen";
import { AcceptableItemModel } from "../models/AcceptableItem";

type acceptableItemInfo  = {
    id? : mongoose.Schema.Types.ObjectId,
    name? : String,
    photo? : String,
}
export default  function sendItemInfo(foundItem: AcceptableItemModel){
    const item : acceptableItemInfo = {
        id : foundItem._id,
        name : foundItem.name,
        photo : foundItem.photo,
        };
    return item
}