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
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_constant_1 = require("../User/user.constant");
const user_model_1 = require("../User/user.model");
const createTrainerIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user already has a trainer
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User already has a trainer');
    }
    //if password is not given , use default password
    payload.password = payload.password || config_1.default.default_password;
    payload.role = user_constant_1.USER_ROLE.trainer;
    try {
        // create a user
        const newUser = yield user_model_1.User.create(payload);
        //create a user
        if (!newUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to register user');
        }
        return newUser;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.TrainerServices = {
    createTrainerIntoDB,
};
