import mongoose, { Schema, Document, Model } from 'mongoose';


export interface UserModel extends Document {
  email : string;
  roles : Array<Number>;
  verified : Boolean
  firstName : string
  lastName : string
  phone : string
  password : string
  status : Boolean,
  createdAt : Date 
  updatedAt : Date
}

const userSchema: Schema<UserModel> = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase : true,
        required : true
    },
    firstName: {
        type: String,
        unique: true,
        lowercase : true,
        required : true
    },
    lastName: {
        type: String,
        unique: true,
        lowercase : true,
        required : true
    },
    roles: {
        type: [Number],
        required : true,
        default : [2000],
    },
    verified: {
        type: Boolean,
        default : false
    },
    status: {
        type: Boolean,
        default : true
    },
    phone: {
        type: String,
        required : false
    },
    password: {
        type: String,
        required : true
    }
},
{
    timestamps : true
});

  
export default mongoose.model('User', userSchema) as any;

