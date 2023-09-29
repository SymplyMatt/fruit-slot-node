import express from 'express';
import { Response, Request } from 'express';
import mongoose from 'mongoose';
import pkg, { body, query, param, check } from 'express-validator';
import validate from '../middleware/validate';
import create from '../controllers/users/booking/create';
import getAllUserBookings from '../controllers/users/booking/getAllBookings';
import getBooking from '../controllers/users/booking/getBooking';
import cancel from '../controllers/users/booking/cancel';
import getAllPendingBookings from '../controllers/users/booking/getPendingBookings';
import getAllCancelledBookings from '../controllers/users/booking/getCancelledBookings';
import getAllSuccessfulBookings from '../controllers/users/booking/getSuccessfulBookings';
import getAllNewBookings from '../controllers/users/booking/getNewBookings';
import getBookingStats from '../controllers/users/booking/getUserBookingStats';
import getGrowthStats from '../controllers/users/booking/getUserBookingGrowthStats';
import getUserMonthlyBookingOverview from '../controllers/users/booking/getUserMonthlyBookingOverview';
import getCurrentMonthBookingStats from '../controllers/users/booking/getCurrentMonthBooking';
const router = express.Router();

router.post('/create',
    [
    body('items')
    .isArray()
    .custom((value ) => {
        for (let index = 0; index < value.length; index++) {
            if (!mongoose.Types.ObjectId.isValid(value[index])) {
                throw new Error(`Invalid item : ${value[index]}`);
                break;
            }
            
        }
        return true;
    }).withMessage('Invalid item'),
    body('additionalPhone')
        .custom((value) => {
            const phoneNumberRegex = /^(\+?234|0)[123456789]\d{9}$/;
            if (!phoneNumberRegex.test(value)) {
            throw new Error('Must a Nigerian Phone Number');
            }
            return true;
        }),
    body('pickUpAddress').isString().notEmpty().withMessage("Invalid Address"),
    body('pickUpLocation')
        .custom((value : any) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid pickUp location');
            }
            return true;
        }),
    body('pickUpDate').isDate().withMessage("Invalid pickUpDate"),
    body('pickUpTimeOne')
    .custom((value : any) => {
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        if (!regex.test(value)) {
            throw new Error('Invalid pickUpTimeOne');
        }
        return true;
    }),
    body('pickUpTimeTwo')
    .custom((value : any) => {
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        if (!regex.test(value)) {
            throw new Error('Invalid pickUpTimeTwo');
        }
        return true;
    }),
  ],validate,create);


router.get('/getAllUserBookings',validate,getAllUserBookings);
router.get('/getPendingBookings',validate,getAllPendingBookings);
router.get('/getAllCancelledBookings',validate,getAllCancelledBookings);
router.get('/getAllSuccessfulBookings',validate,getAllSuccessfulBookings);
router.get('/getAllNewBookings',validate,getAllNewBookings);
router.get('/getBookingStats',validate,getBookingStats);
router.get('/getGrowthStats',validate,getGrowthStats);
router.get('/getUserMonthlyBookingOverview',validate,getUserMonthlyBookingOverview);
router.get('/getCurrentMonthBookingStats',validate,getCurrentMonthBookingStats);

router.get('/getBooking',
    [
        query('bookingId')
            .custom((value : any) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid bookingId');
                }
                return true;
            })
    ],validate,getBooking);

router.post('/cancel',
    [
        body('bookingId')
            .custom((value : any) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid bookingId');
                }
                return true;
            })
    ],validate,cancel);


export default router;
