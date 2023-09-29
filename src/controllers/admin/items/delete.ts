import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import uploadImage from '../../../config/cloudinary';
import sendItemInfo from '../../../config/sendAcceptableItemInfo';
import findOne from '../../../config/findOne';

export default async function deleteItem ( req : AuthenticatedRequest, res : Response) {
    const {name}  = req.body;
    try {
        let foundItem : AcceptableItemModel = await findOne('item', {_id : req.body.itemId});
        if(!foundItem) return sendResponse(res, 401,'Item not found!');
        let deleteResult = await foundItem.deleteOne();

        sendResponse(res, 201,'Success!');
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}