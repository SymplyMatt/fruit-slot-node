import express, { NextFunction } from 'express';
import { Response, Request } from 'express';
import mongoose from 'mongoose';
import pkg, { body, query, param, check } from 'express-validator';
import validate from '../../middleware/validate';
import multer from '../../config/multer';
import imageLimit from '../../middleware/imageLimit';
import deleteItem from '../../controllers/admin/items/delete';
import create from '../../controllers/admin/locations/create';
import modify from '../../controllers/admin/locations/modify';
import _delete from '../../controllers/admin/locations/delete';
const router = express.Router();

router.post('/create',
    [
    body('name').notEmpty().isString().withMessage('Location name is required!'),
  ],validate,create);

router.post('/modify',
    [
    body('locationId')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid locationId');
            }
            return true;
        }),
    body('name').notEmpty().isString().withMessage('Location name is required!'),
  ],validate,modify);

router.post('/delete',
    [
    body('locationId')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid locationId');
            }
            return true;
        })
  ],validate,_delete);



export default router;
