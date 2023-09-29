import { Router, Request, Response } from 'express';
import auth from './auth'
import user from './user'
import verifyJWT from '../middleware/verifyJWT';
const router = Router();

router.use('/auth',auth);
router.use('/users',verifyJWT,user);

export default router;
