"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
var custom_api_1 = require("../errors/custom-api");
var http_status_codes_1 = require("http-status-codes");
var errorHandlerMiddleware = function (err, req, res, next) {
    if (err instanceof custom_api_1.CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ err: err });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
