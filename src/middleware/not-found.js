"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
var notFoundMiddleware = function (req, res) { return res.status(404).send("Route doesn't exist"); };
exports.notFoundMiddleware = notFoundMiddleware;
