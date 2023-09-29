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
const sendResponse_1 = __importDefault(require("../../../config/sendResponse"));
function modifyUserInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, phone, firstName, lastName } = req.body;
        try {
            const userDocument = User_1.default;
            // search for duplicate;
            const foundUser = yield userDocument.findOne({ _id: req.user });
            if (!foundUser)
                return (0, sendResponse_1.default)(res, 401, "Invalid User!");
            if (req.user != foundUser._id)
                return (0, sendResponse_1.default)(res, 401, "Unauthorized!");
            // modify user info
            foundUser.email = email || foundUser.email;
            foundUser.phone = phone || foundUser.phone;
            foundUser.firstName = firstName || foundUser.phone;
            foundUser.lastName = lastName || foundUser.phone;
            foundUser.save();
            (0, sendResponse_1.default)(res, 201, "Success!", foundUser);
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
exports.default = modifyUserInfo;
