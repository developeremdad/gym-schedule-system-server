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
exports.UserServices = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //if password is not given , use default password
    payload.password = payload.password || config_1.default.default_password;
    try {
        // create a user
        const newUser = yield user_model_1.User.create(payload);
        //create a user
        if (!newUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to register user');
        }
        return newUser;
    }
    catch (err) {
        throw new Error(err);
    }
});
const getAllUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
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
const getMe = (phone, role) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOne({ phone, role });
});
const updateUserRoleIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const updateUser = yield user_model_1.User.findByIdAndUpdate(id, { role: payload === null || payload === void 0 ? void 0 : payload.role }, { runValidators: true, new: true });
    return updateUser;
});
const deleteUserIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getMe,
    updateUserRoleIntoDB,
    deleteUserIntoDB,
};
