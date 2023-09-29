import express from 'express';
import { Response, Request } from 'express';
import mongoose from 'mongoose';
import pkg, { body, query, param, check } from 'express-validator';
import validate from '../middleware/validate';
import register from '../controllers/users/auth/register';
import verifyJWT from '../middleware/verifyJWT';
import verifyEmail from '../controllers/users/auth/verifyEmail';
import login from '../controllers/users/auth/login';
import changePassword from '../controllers/users/auth/changePassword';
import requestResetPassword from '../controllers/users/auth/requestResetPassword';
import resetPassword from '../controllers/users/auth/resetPassword';
const router = express.Router();

router.post(
  '/register',
  [
    body('email').isString().withMessage('Email must be a valid email address'),
    body('password')
          .custom((value) => {
            const passwordRegex = /.{6,}/;
            if (!passwordRegex.test(value)) {
            throw new Error('Password must be 6 characters or more');
            }
            return true;
        }),
    body('firstName').isString().withMessage('First name is required'),
    body('lastName').isString().withMessage('Last name is required'),
    body('phone')
        .custom((value) => {
            const phoneNumberRegex = /^(\+?234|0)[123456789]\d{9}$/;
            if (!phoneNumberRegex.test(value)) {
            throw new Error('Must a Nigerian Phone Number');
            }
            return true;
        })
  ],
  validate,register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password')
      .custom((value) => {
        const passwordRegex = /.{6,}/;
        if (!passwordRegex.test(value)) {
        throw new Error('Password must be 6 characters or more');
        }
        return true;
    })
  ],
  validate,login
);

router.post('/verifyEmail', verifyJWT, verifyEmail);

router.post('/changePassword',
 [
  body('oldPassword')
    .custom((value) => {
        const passwordRegex = /.{6,}/;
        if (!passwordRegex.test(value)) {
        throw new Error('Password must be 6 characters or more');
        }
        return true;
    }),
  body('newPassword')
    .custom((value) => {
        const passwordRegex = /.{6,}/;
        if (!passwordRegex.test(value)) {
        throw new Error('Password must be 6 characters or more');
        }
        return true;
    })
    .withMessage(
      'Password must be at least 8 characters long, contain at least one number, one uppercase,one lowercase letter and one special character',
    ),
]
,validate,verifyJWT, changePassword);

router.post('/requestResetPassword',
 [
  body('email')
  .isString().withMessage('Email must be a valid email address')
]
,validate, requestResetPassword);

router.post('/resetPassword',
 [
  body('newPassword')
  .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long, contain at least one number, one uppercase,one lowercase letter and one special character',
    ),
]
,validate, verifyJWT,resetPassword);

router.post('/verifyEmail',validate, verifyJWT, verifyEmail);


export default router;
