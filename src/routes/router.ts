import { Router, Request, Response } from 'express';
import auth from './auth'
import user from './user'
import items from './items'
import locations from './locations'
import booking from './booking'
import adminRouter from './admin/router'
import verifyJWT from '../middleware/verifyJWT';
import verifyAdmin from '../middleware/verifyAdmin';
const router = Router();

router.use('/auth',auth);
router.use('/users',verifyJWT,user);
router.use('/items',items);
router.use('/locations',verifyJWT,locations);
router.use('/booking',verifyJWT,booking);




router.use('/admin',verifyJWT, verifyAdmin,adminRouter);


export default router;
