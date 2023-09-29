import mongoose, { Schema, Document, Model, Date as mongooseDate } from 'mongoose';

export interface BookingModel extends Document {
  createdBy : mongoose.Schema.Types.ObjectId;
  items : Array<mongoose.Schema.Types.ObjectId>;
  additionalPhone : String;
  pickUpAddress : String;
  pickUpLocation :  mongoose.Schema.Types.ObjectId;
  pickUpDate :  Date;
  pickUpTimeOne :  Date;
  pickUpTimeTwo :  Date;
  bookingId :  number;
  status :  String;
  createdAt :  Date;
  updatedAt :  Date;
}

const bookingSchema: Schema<BookingModel> = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        immutable : true
    },
    items: {
        type: [mongoose.Schema.Types.ObjectId],
        ref : "AcceptableItem",
        required : true,
    },
    additionalPhone : {
        type: String,
        required : true,
    },
    pickUpAddress : {
        type: String,
        required : true,
    },
    pickUpLocation : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
    },
    pickUpDate : {
        type: Date,
        required : true,
    },
    pickUpTimeOne : {
        type: Date,
        required : true,
    },
    pickUpTimeTwo : {
        type: Date,
        required : true,
    },
    bookingId : {
        type: Number,
        required : true,
    },
    status : {
        type: String,
        required : true,
        default : "pending",
        enum : ["pending", "successful", "cancelled"],
    },
},
{
    timestamps : true
});


export default mongoose.model('Booking', bookingSchema) as any;

