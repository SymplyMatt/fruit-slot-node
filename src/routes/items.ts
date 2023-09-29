import express from 'express';
import { Response, Request } from 'express';
import mongoose from 'mongoose';
import pkg, { body, query, param, check } from 'express-validator';
import validate from '../middleware/validate';
import getAllItems from '../controllers/users/items/items';
import getItem from '../controllers/users/items/getItem';
import verifyJWT from '../middleware/verifyJWT';
const router = express.Router();

router.get('/getAllItems',validate,getAllItems);

router.get('/getItem',
    [
    query('itemId')
      .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid itemId');
      }
      return true;
    }),
  ],validate,verifyJWT,getItem);



export default router;
