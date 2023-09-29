import jwt from 'jsonwebtoken'
import { Mongoose, Schema } from 'mongoose';

export default  function genToken (object : Object, expiresIn : string){
    
    const accessToken : string = jwt.sign(
        {
            "UserInfo": object
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: expiresIn}
    );
    return accessToken
}