"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
var auth_1 = require("../controllers/auth");
router.post('/register', auth_1.register);
router.post('/login', auth_1.login);
exports.default = router;
