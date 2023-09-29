import { Request } from "express";
import mongoose from "mongoose";

export default interface AuthenticatedRequest extends Request {
    user?: string | mongoose.Schema.Types.ObjectId,
    email?: string,
    roles?: Array<Number>,
  }