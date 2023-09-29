"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendResponse(res, response, message, data = {}) {
    if (JSON.stringify(data) == "{}") {
        return res.status(response).json({
            message,
        });
    }
    return res.status(response).json({
        message,
        data
    });
}
exports.default = sendResponse;
