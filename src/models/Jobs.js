"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
var mongoose_1 = require("mongoose");
var JobSchema = new mongoose_1.default.Schema({
    company: {
        type: String,
        required: [true, "company"],
        maxLength: 50,
    },
    position: {
        type: String,
        required: [true, "position"],
        maxLength: 100,
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "created by?"]
    },
}, { timestamps: true });
exports.Job = mongoose_1.default.model('Job', JobSchema);
