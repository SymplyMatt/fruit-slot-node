"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../models/User"));
const jwtGen_1 = __importDefault(require("../../../config/jwtGen"));
const sendEmail_1 = __importDefault(require("../../../config/sendEmail"));
const sendResponse_1 = __importDefault(require("../../../config/sendResponse"));
function requestResetPassword(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userDocument = User_1.default;
            // search for duplicate;
            const foundUser = yield userDocument.findOne({ email: req.body.email });
            if (!foundUser)
                return (0, sendResponse_1.default)(res, 401, "User does not exist");
            // jwt
            const accessToken = yield (0, jwtGen_1.default)({
                user: foundUser._id,
                email: foundUser.email
            }, '30m');
            res.status(200).json({
                requestSuccessful: true,
                message: "Password reset link has been sent to " + req.body.email,
            });
            const emailOutput = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                a{
                    text-decoration : none;
                }
                button {
                appearance: none;
                background-color: #2ea44f;
                border: 1px solid rgba(27, 31, 35, .15);
                border-radius: 6px;
                box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
                box-sizing: border-box;
                color: white;
                cursor: pointer;
                display: inline-block;
                font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
                font-size: 14px;
                font-weight: 600;
                line-height: 20px;
                padding: 6px 16px;
                position: relative;
                text-align: center;
                text-decoration: none;
                user-select: none;
                -webkit-user-select: none;
                touch-action: manipulation;
                vertical-align: middle;
                white-space: nowrap;
                }
                button:focus:not(:focus-visible):not(.focus-visible) {
                box-shadow: none;
                outline: none;
                }
                button:hover {
                background-color: #2c974b;
                }
                button:focus {
                box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
                outline: none;
                }
                button:disabled {
                background-color: #94d3a2;
                border-color: rgba(27, 31, 35, .1);
                color: white;
                cursor: default;
                }
                button:active {
                background-color: #298e46;
                box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
                }
            
            </style>
        </head>
        <body>
            <h1>Click this button to reset your password. Link expires after 30 minutes.</h1>
            <button><a href=${((_a = foundUser === null || foundUser === void 0 ? void 0 : foundUser.roles) === null || _a === void 0 ? void 0 : _a.includes(2001)) ? 'https://gjc-admin.vercel.app/reset/' + accessToken : "https://gjc-delta.vercel.app/reset/" + accessToken}>Click</a></button>
        </body>
        </html>
        `;
            (0, sendEmail_1.default)('Password reset', emailOutput, foundUser.email);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                requestSucessful: false,
                message: "An error occured!"
            });
        }
    });
}
exports.default = requestResetPassword;
