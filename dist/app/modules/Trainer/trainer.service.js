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
exports.TrainerServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const classSchedule_model_1 = require("../ClassSchedule/classSchedule.model");
const user_constant_1 = require("../User/user.constant");
const user_model_1 = require("../User/user.model");
const createNewTrainerIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //if password is not given , use default password
    payload.password = payload.password || config_1.default.default_password;
    payload.role = user_constant_1.USER_ROLE.trainer;
    try {
        // create a user as a trainer
        const newUser = yield user_model_1.User.create(payload);
        //create a user
        if (!newUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create new trainer user');
        }
        return newUser;
    }
    catch (err) {
        throw new Error(err);
    }
});
const getTrainerFromDB = (trainerID) => __awaiter(void 0, void 0, void 0, function* () {
    const trainer = yield user_model_1.User.findById(trainerID);
    if (!trainer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Trainer not found');
    }
    return trainer;
});
const updateTrainerInDB = (trainerID, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const trainer = yield user_model_1.User.findById(trainerID);
    if (!trainer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Trainer not found');
    }
    const trainerPass = yield user_model_1.User.isUserExistsByEmail(trainer === null || trainer === void 0 ? void 0 : trainer.email);
    trainer.email = updateData.email;
    trainer.fullName = updateData.fullName;
    trainer.password = trainerPass.password;
    const result = yield trainer.save();
    return result;
});
const getAllTrainersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const buildingQuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
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
const getTrainerClassScheduleFromDB = (trainerId) => __awaiter(void 0, void 0, void 0, function* () {
    const trainer = yield user_model_1.User.findById(trainerId);
    if (!trainer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Trainer not found');
    }
    const trainerClassSchedule = yield classSchedule_model_1.ClassSchedule.find({
        trainer: trainerId,
    }).populate('trainees');
    return trainerClassSchedule;
});
const deleteTrainerIntoDB = (trainerID) => __awaiter(void 0, void 0, void 0, function* () {
    const trainer = yield user_model_1.User.findById(trainerID);
    if (!trainer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Trainer not found');
    }
    const result = yield user_model_1.User.deleteOne({ _id: trainer._id });
    return result;
});
exports.TrainerServices = {
    createNewTrainerIntoDB,
    updateTrainerInDB,
    getAllTrainersFromDB,
    getTrainerFromDB,
    getTrainerClassScheduleFromDB,
    deleteTrainerIntoDB,
};
