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
exports.TrainerControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const trainer_service_1 = require("./trainer.service");
const createNewTrainer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trainer_service_1.TrainerServices.createNewTrainerIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Create new trainer successfully',
        data: result,
    });
}));
const getTrainerClassSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield trainer_service_1.TrainerServices.getTrainerClassScheduleFromDB(user._id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Trainer class schedule retrieve successfully',
        data: result,
    });
}));
const getTrainer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trainer_service_1.TrainerServices.getTrainerFromDB(req.params.trainerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Trainer is retrieved successfully',
        data: result,
    });
}));
const updateTrainer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trainer_service_1.TrainerServices.updateTrainerInDB(req.params.trainerId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Update Trainer successfully',
        data: result,
    });
}));
const getAllTrainers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trainer_service_1.TrainerServices.getAllTrainersFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Trainers is retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
}));
const deleteTrainer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trainer_service_1.TrainerServices.deleteTrainerIntoDB(req.params.trainerID);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Delete trainer successfully',
        data: result,
    });
}));
exports.TrainerControllers = {
    createNewTrainer,
    getTrainerClassSchedule,
    updateTrainer,
    getTrainer,
    getAllTrainers,
    deleteTrainer,
};
