import mongoose, { Schema, Document, Model } from 'mongoose';

export interface AcceptableItemModel extends Document {
  createdBy : mongoose.Schema.Types.ObjectId;
  name : String;
  photo : String
}

const acceptableItemSchema: Schema<AcceptableItemModel> = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        immutable : true
    },
    name: {
        type: String,
        required : true,
    },
    photo: {
        type: String,
        required : true
    },
});

  
export default mongoose.model('AcceptableItem', acceptableItemSchema) as any;

