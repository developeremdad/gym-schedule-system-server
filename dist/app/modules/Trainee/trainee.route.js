"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraineeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_constant_1 = require("../User/user.constant");
const user_validation_1 = require("../User/user.validation");
const trainee_controller_1 = require("./trainee.controller");
const router = express_1.default.Router();
router.post('/create', (0, validateRequest_1.default)(user_validation_1.UserValidation.userValidationSchema), trainee_controller_1.TraineeControllers.createNewTrainee);
router.get('/get-trainees', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), trainee_controller_1.TraineeControllers.getAllTrainees);
exports.TraineeRoutes = router;
