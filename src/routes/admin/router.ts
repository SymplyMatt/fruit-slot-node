import { Router, Request, Response } from 'express';
import acceptableItems from './acceptableItems'
import locations from './locations'
import users from './users'
import booking from './booking'
const router = Router();

router.use('/items',acceptableItems);
router.use('/locations',locations);
router.use('/users',users);
router.use('/booking',booking);


export default router;
