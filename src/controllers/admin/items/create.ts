import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import uploadImage from '../../../config/cloudinary';
import sendItemInfo from '../../../config/sendAcceptableItemInfo';

export default async function create ( req : AuthenticatedRequest, res : Response) {
    const {name}  = req.body;
    try {
        if(!req.file) return sendResponse(res, 400, "Photo is required");
        const AcceptableItemDocument: Model<AcceptableItemModel> = AcceptableItem;
        // Create a new document
        let photoUrl : any = await uploadImage(req.file?.path);
        if(!photoUrl) return sendResponse(res, 400 ,"error!");
        const newItem: AcceptableItemModel = await AcceptableItemDocument.create({
            createdBy : req.user,
            name,
            photo : photoUrl
        });
        sendResponse(res, 201,'Item created successfully!', await sendItemInfo(newItem));
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}