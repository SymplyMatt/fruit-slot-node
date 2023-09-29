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
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendResponse_1 = __importDefault(require("../../../config/sendResponse"));
const hashGen_1 = __importDefault(require("../../../config/hashGen"));
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userDocument = User_1.default;
            // search for duplicate;
            const foundUser = yield userDocument.findOne({ _id: req.user });
            if (!foundUser)
                return (0, sendResponse_1.default)(res, 401, "User not found!");
            const match = yield bcrypt_1.default.compare(req.body.oldPassword, foundUser.password);
            if (!match)
                return (0, sendResponse_1.default)(res, 401, "Incorrect old password");
            foundUser.password = yield (0, hashGen_1.default)(req.body.newPassword);
            foundUser.save();
            return (0, sendResponse_1.default)(res, 200, 'Password Changed!');
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
exports.default = changePassword;
