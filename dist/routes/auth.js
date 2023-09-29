"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validate_1 = __importDefault(require("../middleware/validate"));
const register_1 = __importDefault(require("../controllers/users/auth/register"));
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const verifyEmail_1 = __importDefault(require("../controllers/users/auth/verifyEmail"));
const login_1 = __importDefault(require("../controllers/users/auth/login"));
const changePassword_1 = __importDefault(require("../controllers/users/auth/changePassword"));
const requestResetPassword_1 = __importDefault(require("../controllers/users/auth/requestResetPassword"));
const resetPassword_1 = __importDefault(require("../controllers/users/auth/resetPassword"));
const router = express_1.default.Router();
router.post('/register', [
    (0, express_validator_1.body)('email').isString().withMessage('Email must be a valid email address'),
    (0, express_validator_1.body)('password')
        .custom((value) => {
        const passwordRegex = /.{6,}/;
        if (!passwordRegex.test(value)) {
            throw new Error('Password must be 6 characters or more');
        }
        return true;
    }),
    (0, express_validator_1.body)('firstName').isString().withMessage('First name is required'),
    (0, express_validator_1.body)('lastName').isString().withMessage('Last name is required'),
    (0, express_validator_1.body)('phone')
        .custom((value) => {
        const phoneNumberRegex = /^(\+?234|0)[123456789]\d{9}$/;
        if (!phoneNumberRegex.test(value)) {
            throw new Error('Must a Nigerian Phone Number');
        }
        return true;
    })
], validate_1.default, register_1.default);
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email must be a valid email address'),
    (0, express_validator_1.body)('password')
        .custom((value) => {
        const passwordRegex = /.{6,}/;
        if (!passwordRegex.test(value)) {
            throw new Error('Password must be 6 characters or more');
        }
        return true;
    })
], validate_1.default, login_1.default);
router.post('/verifyEmail', verifyJWT_1.default, verifyEmail_1.default);
router.post('/changePassword', [
    (0, express_validator_1.body)('oldPassword')
        .custom((value) => {
        const passwordRegex = /.{6,}/;
        if (!passwordRegex.test(value)) {
            throw new Error('Password must be 6 characters or more');
        }
        return true;
    }),
    (0, express_validator_1.body)('newPassword')
        .custom((value) => {
        const passwordRegex = /.{6,}/;
        if (!passwordRegex.test(value)) {
            throw new Error('Password must be 6 characters or more');
        }
        return true;
    })
        .withMessage('Password must be at least 8 characters long, contain at least one number, one uppercase,one lowercase letter and one special character'),
], validate_1.default, verifyJWT_1.default, changePassword_1.default);
router.post('/requestResetPassword', [
    (0, express_validator_1.body)('email')
        .isString().withMessage('Email must be a valid email address')
], validate_1.default, requestResetPassword_1.default);
router.post('/resetPassword', [
    (0, express_validator_1.body)('newPassword')
        .isStrongPassword()
        .withMessage('Password must be at least 8 characters long, contain at least one number, one uppercase,one lowercase letter and one special character'),
], validate_1.default, verifyJWT_1.default, resetPassword_1.default);
router.post('/verifyEmail', validate_1.default, verifyJWT_1.default, verifyEmail_1.default);
exports.default = router;
