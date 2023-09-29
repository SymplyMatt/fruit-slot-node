"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins_1 = __importDefault(require("./allowedOrigins"));
// Define an array of allowed origins
// Middleware function to handle CORS
function corsMiddleware(req, res, next) {
    const origin = req.get('origin');
    console.log(origin);
    // Check if the request origin is in the allowed origins list
    if (allowedOrigins_1.default.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    // Handle preflight requests (OPTIONS)
    if (req.method === 'OPTIONS') {
        res.sendStatus(204); // No content for preflight requests
    }
    else {
        next(); // Continue processing the request
    }
}
exports.default = corsMiddleware;
