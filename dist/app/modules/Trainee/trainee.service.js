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
exports.TraineeServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_constant_1 = require("../User/user.constant");
const user_model_1 = require("../User/user.model");
const createNewTraineeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.role = user_constant_1.USER_ROLE.trainee;
    try {
        // create a user as a trainer
        const newUser = yield user_model_1.User.create(payload);
        //create a user
        if (!newUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to register new trainee user');
        }
        return newUser;
    }
    catch (err) {
        throw new Error(err);
    }
});
const getAllTraineesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.TraineeServices = {
    getAllTraineesFromDB,
    createNewTraineeIntoDB,
};
