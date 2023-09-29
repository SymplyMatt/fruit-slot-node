import mongoose, { Schema, Document, Model } from 'mongoose';

export interface LocationModel extends Document {
  createdBy : mongoose.Schema.Types.ObjectId;
  name : String;
}

const locationSchema: Schema<LocationModel> = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        immutable : true
    },
    name: {
        type: String,
        required : true,
    }
});

  
export default mongoose.model('Location', locationSchema) as any;

