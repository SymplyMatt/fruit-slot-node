"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    firstName: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    lastName: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    roles: {
        type: [Number],
        required: true,
        default: [2000],
    },
    verified: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('User', userSchema);
