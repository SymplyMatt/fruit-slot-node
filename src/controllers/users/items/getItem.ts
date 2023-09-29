import { Router, Request, Response } from 'express';
import AcceptableItem , { AcceptableItemModel } from '../../../models/AcceptableItem';
import { Model } from 'mongoose';
import sendResponse from '../../../config/sendResponse';
import AuthenticatedRequest from '../../../config/authenticatedRequst';
import sendItemInfo from '../../../config/sendAcceptableItemInfo';
import findOne from '../../../config/findOne';

export default async function getItem ( req : AuthenticatedRequest, res : Response) {
    const {name}  = req.body;
    try {
        // Create a new document
        let foundItem : AcceptableItemModel = await findOne('item', {_id : req.query.itemId});
        if(!foundItem) return sendResponse(res, 401,'Item not found!');
        sendResponse(res, 201,'Success!', await sendItemInfo(foundItem));
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            requestSucessful : false,
            message : "An error occured!"
        });
    }
}