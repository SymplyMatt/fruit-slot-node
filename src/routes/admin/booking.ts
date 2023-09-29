import express, { NextFunction } from 'express';
import mongoose from 'mongoose';
import pkg, { body, query, param, check } from 'express-validator';
import validate from '../../middleware/validate';
import success from '../../controllers/admin/booking/success';
import getAllBookings from '../../controllers/admin/booking/getAllBookings';
import getAllPendingBookings from '../../controllers/admin/booking/getAllPendingBookings';
import getAllCancelledBookings from '../../controllers/admin/booking/getAllCancelledBookings';
import getAllSuccessfulBookings from '../../controllers/admin/booking/getAllSuccessfulBookings';
import getAllNewBookings from '../../controllers/admin/booking/getNewBookings';
import getAllUserBookingStats from '../../controllers/admin/booking/getBookingStats';
import getUsersBookingGrowthStats from '../../controllers/admin/booking/getUsersBookingGrowth';
import getDailyBookings from '../../controllers/admin/booking/getDailyBookings';
import getBookingOverview from '../../controllers/admin/booking/getBookingOverview';
import getWeekBookingStats from '../../controllers/admin/booking/getWeekBookingStats';
import getMonthlyBookingStats from '../../controllers/admin/booking/getMonthBookingStats';
import getYearBookingStats from '../../controllers/admin/booking/getYearlyBookings';
import getUserBookingStats from '../../controllers/admin/booking/getUserBookingStats';
import getUserBookingOverview from '../../controllers/admin/booking/getUserBookingOverview';
import setBookingStatus from '../../controllers/admin/booking/success';
const router = express.Router();


router.post('/setBookingStatus',
    [
    body('bookingId')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid bookingId');
            }
            return true;
        }),
    body('status').isIn([
        'successful',
        'cancelled',
        'pending',
    ])
  ],validate,setBookingStatus);

router.get('/getAllBookings',validate,getAllBookings);
router.get('/getAllPendingBookings',validate,getAllPendingBookings);
router.get('/getAllCancelledBookings',validate,getAllCancelledBookings);
router.get('/getAllSuccessfulBookings',validate,getAllSuccessfulBookings);
router.get('/getAllNewBookings',validate,getAllNewBookings);
router.get('/getAllUserBookingStats',validate,getAllUserBookingStats);
router.get('/getUsersBookingGrowthStats',validate,getUsersBookingGrowthStats);
router.get('/getDailyBookings',validate,getDailyBookings);
router.get('/getBookingOverview',validate,getBookingOverview);
router.get('/getWeekBookingStats',validate,getWeekBookingStats);
router.get('/getMonthlyBookingStats',validate,getMonthlyBookingStats);
router.get('/getYearBookingStats',validate,getYearBookingStats);

router.get('/getUserBookingStats',
    [
        query('userId')
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid userId');
                }
                return true;
            })
  ],validate,getUserBookingStats);

router.get('/getUserBookingOverview',
    [
        query('userId')
            .custom((value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid userId');
                }
                return true;
            })
  ],validate,getUserBookingOverview);


export default router;
