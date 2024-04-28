"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
var jobs_1 = require("../controllers/jobs");
router.route('/').post(jobs_1.createJob).get(jobs_1.getAllJobs);
router.route('/"id').get(jobs_1.getJobs).delete(jobs_1.DeleteJob).patch(jobs_1.UpdateJob);
exports.default = router;
