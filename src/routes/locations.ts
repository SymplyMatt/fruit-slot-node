import express from 'express';
import { Response, Request } from 'express';
import mongoose from 'mongoose';
import pkg, { body, query, param, check } from 'express-validator';
import validate from '../middleware/validate';
import getAllItems from '../controllers/users/items/items';
import getItem from '../controllers/users/items/getItem';
import getAllLocations from '../controllers/users/locations/getLocations';
const router = express.Router();

router.get('/getAllLocations',validate,getAllLocations);


export default router;
