import express, { NextFunction } from 'express';
import { Response, Request } from 'express';
import mongoose from 'mongoose';
import pkg, { body, query, param, check } from 'express-validator';
import validate from '../../middleware/validate';
import multer from '../../config/multer';
import create from '../../controllers/admin/items/create';
import imageLimit from '../../middleware/imageLimit';
import modify from '../../controllers/admin/items/modify';
import deleteItem from '../../controllers/admin/items/delete';
const router = express.Router();

router.post('/create',  multer.single('photo'),
    [
    body('name').notEmpty().isString().withMessage('Item name is required!'),
  ],validate, imageLimit ,create);

router.post('/modify',  multer.single('photo'),
    [
    body('name').optional().notEmpty().isString().withMessage('Item name is required!'),
    body('itemId')
      .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid itemId');
      }
      return true;
    }),
  ],validate, imageLimit ,modify);

router.post('/delete', 
  [
    body('itemId')
      .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid itemId');
      }
      return true;
    }),
  ],validate ,deleteItem);

export default router;
