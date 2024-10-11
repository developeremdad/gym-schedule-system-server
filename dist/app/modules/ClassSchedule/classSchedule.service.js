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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassScheduleServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_constant_1 = require("../User/user.constant");
const user_model_1 = require("../User/user.model");
const classSchedule_model_1 = require("./classSchedule.model");
const createClassScheduleIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if 5 classes are already scheduled for the same day
        const scheduledClasses = yield classSchedule_model_1.ClassSchedule.find({
            scheduleDate: payload.scheduleDate,
        });
        if (scheduledClasses.length >= 5) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "'Maximum of 5 classes allowed per day");
        }
        // Parse start and end times
        const startTime = moment_timezone_1.default
            .tz(`${payload.scheduleDate} ${payload.startTime}`, 'Asia/Dhaka')
            .toDate();
        const endTime = moment_timezone_1.default
            .tz(`${payload.scheduleDate} ${payload.endTime}`, 'Asia/Dhaka')
            .toDate();
        // Check for overlapping schedules
        const overlappingSchedule = yield classSchedule_model_1.ClassSchedule.findOne({
            scheduleDate: payload.scheduleDate,
            $or: [
                {
                    startTime: { $lt: endTime, $gte: startTime },
                },
                {
                    endTime: { $gt: startTime, $lte: endTime },
                },
            ],
        });
        if (overlappingSchedule) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'A class is already scheduled at the same time');
        }
        // Calculate the difference in milliseconds
        const timeDifference = endTime.getTime() - startTime.getTime();
        // Convert milliseconds to hours
        const durationInHours = timeDifference / (1000 * 60 * 60);
        // Check if the duration is exactly 2 hours
        if (durationInHours !== 2) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Class schedule duration must be exactly 2 hours');
        }
        payload.startTime = String(startTime);
        payload.endTime = String(endTime);
        // Continue to create the class schedule in the database
        const result = yield classSchedule_model_1.ClassSchedule.create(payload);
        return result;
    }
    catch (err) {
        throw new Error(err.message || 'Error creating class schedule');
    }
});
const assigningTrainerIntoClassSchedule = (trainerId, classScheduleId) => __awaiter(void 0, void 0, void 0, function* () {
    const trainer = yield user_model_1.User.findById(trainerId);
    if (!trainer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Trainer not found');
    }
    // Check if the user is actually a trainer
    if (trainer.role !== user_constant_1.USER_ROLE.trainer) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'The user is not a trainer');
    }
    const classSchedule = yield classSchedule_model_1.ClassSchedule.findById(classScheduleId);
    if (!classSchedule) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Class schedule not found');
    }
    // Assign the trainer to the class schedule
    const trainerObjectId = new mongoose_1.default.Types.ObjectId(trainerId);
    classSchedule.trainer = trainerObjectId;
    const result = yield classSchedule.save();
    return result;
});
const deleteClassScheduleIntoDB = (classScheduleId) => __awaiter(void 0, void 0, void 0, function* () {
    const classSchedule = yield classSchedule_model_1.ClassSchedule.findById(classScheduleId);
    if (!classSchedule) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Class schedule not found');
    }
    const result = yield classSchedule_model_1.ClassSchedule.deleteOne({ _id: classSchedule });
    return result;
});
const getAllClassScheduleFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const buildingQuery = new QueryBuilder_1.default(classSchedule_model_1.ClassSchedule.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield buildingQuery.countTotal();
    const result = yield buildingQuery.modelQuery;
    return {
        meta,
        result,
    };
});
exports.ClassScheduleServices = {
    createClassScheduleIntoDB,
    assigningTrainerIntoClassSchedule,
    deleteClassScheduleIntoDB,
    getAllClassScheduleFromDB,
};
