import express from 'express';
import { Response, Request } from 'express';
import mongoose from 'mongoose';
import pkg, { body, query, param, check } from 'express-validator';
import validate from '../middleware/validate';
import modifyUserInfo from '../controllers/users/user/modifyUserInfo';
import multer from '../config/multer';
import getUserInfo from '../controllers/users/user/getUserInfo';
import imageLimit from '../middleware/imageLimit';
const router = express.Router();

router.post(
  '/modifyUserInfo', multer.single('photo'),
  [
    body('email').optional().isEmail().withMessage('Email must be a valid email address'),
    body('firstName').optional().isString().withMessage('Invalid first name'),
    body('lastName').optional().isString().withMessage('Invalid last name'),
    body('phone')
        .optional()
        .custom((value) => {
            const phoneNumberRegex = /^(\+?234|0)[123456789]\d{9}$/;
            if (!phoneNumberRegex.test(value)) {
            throw new Error('Must a Nigerian Phone Number');
            }
            return true;
        })
  ],
  validate,modifyUserInfo
);

router.get('/getUserInfo',validate,getUserInfo);



export default router;
