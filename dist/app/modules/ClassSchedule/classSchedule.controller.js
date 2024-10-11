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
exports.ClassScheduleControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const classSchedule_service_1 = require("./classSchedule.service");
const createClassSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield classSchedule_service_1.ClassScheduleServices.createClassScheduleIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Class schedule created successfully',
        data: result,
    });
}));
const assigningTrainerToClassSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield classSchedule_service_1.ClassScheduleServices.assigningTrainerIntoClassSchedule(req.body.trainerId, req.params.classScheduleId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Assign trainer to Class schedule successfully',
        data: result,
    });
}));
const deleteClassSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield classSchedule_service_1.ClassScheduleServices.deleteClassScheduleIntoDB(req.params.classScheduleId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Delete Class schedule successfully',
        data: result,
    });
}));
const getAllClassSchedules = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield classSchedule_service_1.ClassScheduleServices.getAllClassScheduleFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Class Schedule is retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
}));
exports.ClassScheduleControllers = {
    createClassSchedule,
    assigningTrainerToClassSchedule,
    deleteClassSchedule,
    getAllClassSchedules,
};
