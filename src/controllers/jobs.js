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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteJob = exports.UpdateJob = exports.createJob = exports.getJobs = exports.getAllJobs = void 0;
var Jobs_1 = require("../models/Jobs");
var bad_request_1 = require("../errors/bad-request");
var not_found_1 = require("../errors/not-found");
var http_status_codes_1 = require("http-status-codes");
var getAllJobs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var AllJobs, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Jobs_1.Job.find({ createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId }).sort('createdAt')];
            case 1:
                AllJobs = _b.sent();
                res.status(http_status_codes_1.default.OK).json({ AllJobs: AllJobs, count: AllJobs.length });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                console.error(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllJobs = getAllJobs;
var getJobs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jobId, job, err_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                jobId = req.params.id;
                return [4 /*yield*/, Jobs_1.Job.findById({ _id: jobId, createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId })];
            case 1:
                job = _b.sent();
                if (!job)
                    throw new not_found_1.NotFoundError("no job ".concat(jobId));
                res.status(http_status_codes_1.default.OK).json({ job: job });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                console.error(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getJobs = getJobs;
var createJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var job, err_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                req.body.createdBy = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                return [4 /*yield*/, Jobs_1.Job.create(req.body)];
            case 1:
                job = _b.sent();
                res.status(http_status_codes_1.default.CREATED).json({ job: job });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                console.log(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createJob = createJob;
var UpdateJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, company, position, jobId, job, err_4;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, company = _a.company, position = _a.position, jobId = req.params.id;
                if (company === '' || position === "")
                    throw new bad_request_1.BadRequestError("one empty");
                return [4 /*yield*/, Jobs_1.Job.findOneAndUpdate({ _id: jobId, createdBy: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId }, req.body, { new: true, runValidators: true })];
            case 1:
                job = _c.sent();
                if (!job)
                    throw new bad_request_1.BadRequestError("doesnt exist");
                res.status(http_status_codes_1.default.CREATED).json({ job: job });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _c.sent();
                console.error(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.UpdateJob = UpdateJob;
var DeleteJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, company, position, jobId, job, err_5;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, company = _a.company, position = _a.position, jobId = req.params.id;
                return [4 /*yield*/, Jobs_1.Job.findOneAndDelete({ _id: jobId, createdBy: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId })];
            case 1:
                job = _c.sent();
                if (!job)
                    throw new bad_request_1.BadRequestError("doesnt exist");
                res.status(http_status_codes_1.default.CREATED).json({ job: job });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _c.sent();
                console.error(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.DeleteJob = DeleteJob;
