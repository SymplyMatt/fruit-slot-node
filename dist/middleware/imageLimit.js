"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse_1 = __importDefault(require("../config/sendResponse"));
const imageLimit = (req, res, next) => {
    var _a, _b;
    const imageSize = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0;
    if (imageSize <= 2097152) {
        next();
    }
    else {
        return (0, sendResponse_1.default)(res, 400, "Photo size must not exceed 2MB");
    }
};
exports.default = imageLimit;
