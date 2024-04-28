import express from "express";
const router = express.Router();
import {createJob, getJobs, getAllJobs, DeleteJob, UpdateJob} from "../controllers/jobs";

router.route('/').post(createJob).get(getAllJobs);
router.route('/"id').get(getJobs).delete(DeleteJob).patch(UpdateJob);

export default router;