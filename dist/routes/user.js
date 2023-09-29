"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validate_1 = __importDefault(require("../middleware/validate"));
const modifyUserInfo_1 = __importDefault(require("../controllers/users/user/modifyUserInfo"));
const multer_1 = __importDefault(require("../config/multer"));
const getUserInfo_1 = __importDefault(require("../controllers/users/user/getUserInfo"));
const router = express_1.default.Router();
router.post('/modifyUserInfo', multer_1.default.single('photo'), [
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('Email must be a valid email address'),
    (0, express_validator_1.body)('firstName').optional().isString().withMessage('Invalid first name'),
    (0, express_validator_1.body)('lastName').optional().isString().withMessage('Invalid last name'),
    (0, express_validator_1.body)('phone')
        .optional()
        .custom((value) => {
        const phoneNumberRegex = /^(\+?234|0)[123456789]\d{9}$/;
        if (!phoneNumberRegex.test(value)) {
            throw new Error('Must a Nigerian Phone Number');
        }
        return true;
    })
], validate_1.default, modifyUserInfo_1.default);
router.get('/getUserInfo', validate_1.default, getUserInfo_1.default);
exports.default = router;
