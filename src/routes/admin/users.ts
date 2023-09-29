import express, { NextFunction } from 'express';
import mongoose from 'mongoose';
import pkg, { body, query, param, check } from 'express-validator';
import validate from '../../middleware/validate';
import _delete from '../../controllers/admin/locations/delete';
import activate from '../../controllers/admin/users/activate';
import suspend from '../../controllers/admin/users/suspend';
import create from '../../controllers/admin/users/create';
import verifySuperAdmin from '../../middleware/verifySuperAdmin';
import deleteUser from '../../controllers/admin/users/delete';
import getUser from '../../controllers/admin/users/getUser';
import getAllUsers from '../../controllers/admin/users/getAllUsers';
import getAllAdmins from '../../controllers/admin/users/getAllAdmins';
import getAllUserGrowthStats from '../../controllers/admin/booking/getUsersGrowth';
import getAllUserStats from '../../controllers/admin/users/getUsersStats';
import getTopUsers from '../../controllers/admin/users/getTopUsers';
import getEveryUser from '../../controllers/admin/users/getEveryUser';
const router = express.Router();


router.post(
    '/create',verifySuperAdmin,
    [
        body('email').isString().withMessage('Email must be a valid email address'),
        body('password')
        .isStrongPassword()
        .withMessage(
            'Password must be at least 8 characters long, contain at least one number, one uppercase,one lowercase letter and one special character',
        ),
        body('roles').isString().isIn(['user', 'admin', 'superAdmin']).withMessage('roles can be user, admin or superAdmin')
            
    ],
    validate,create
  );
  
router.post('/activate',
    [
    body('userId')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid userId');
            }
            return true;
        }),
  ],validate,activate);

router.post('/suspend',
    [
    body('userId')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid userId');
            }
            return true;
        }),
  ],validate,suspend);

router.post('/delete',
    [
    body('userId')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid userId');
            }
            return true;
        }),
  ],validate,deleteUser);

router.get('/getUser',
    [
    query('userId')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid userId');
            }
            return true;
        }),
  ],validate,getUser);

  router.get('/getAllUsers',validate,getAllUsers);
  router.get('/getAllAdmins',validate,getAllAdmins);
  router.get('/getEveryUser',validate,getEveryUser);
  router.get('/getAllUserGrowthStats',validate,getAllUserGrowthStats);
  router.get('/getAllUserStats',validate,getAllUserStats);
  router.get('/getTopUsers',validate,getTopUsers);


export default router;
