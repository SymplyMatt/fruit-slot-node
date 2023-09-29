import { UserModel } from "../models/User";
import genToken from "./jwtGen";

type userInfo  = {
    id? : String,
    fullName? : String,
    email? : String,
    phone? : String,
    accessToken? : String,
    userId? : Number,
    roles? : String,
    photo? : String,
    status? : Boolean,
}
export default  function sendUserInfo(foundUser: UserModel,token : Boolean = false){
    
    let user : userInfo = {};
    if(token){
        user= {
            id : foundUser._id,
            fullName : foundUser.fullName,
            email : foundUser.email,
            phone : foundUser.phone,
            photo : foundUser.photo,
            roles : foundUser.roles.includes(2002) ? 'Superadmin' : foundUser.roles.includes(2001)? "Admin" : "User",
            accessToken: genToken({
                user : foundUser._id,
                email : foundUser.email,
                userId : foundUser.userId,
                roles : foundUser.roles,
            }, '1w') ,
            userId : foundUser.userId,
            status : foundUser.status
        };
    }else{
        user= {
            id : foundUser._id,
            fullName : foundUser.fullName,
            email : foundUser.email,
            phone : foundUser.phone,
            userId : foundUser.userId,
            photo : foundUser.photo,
            roles : foundUser.roles.includes(2002) ? 'Superadmin' : foundUser.roles.includes(2001)? "Admin" : "User",
            status : foundUser.status
        }
    }
    return user
}