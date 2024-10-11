"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const trainer_controller_1 = require("./trainer.controller");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), trainer_controller_1.TrainerControllers.createNewTrainer);
router.get('/my-class-schedule', (0, auth_1.default)(user_constant_1.USER_ROLE.trainer), trainer_controller_1.TrainerControllers.getTrainerClassSchedule);
router.patch('/:trainerId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), trainer_controller_1.TrainerControllers.updateTrainer);
router.get('/:trainerId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), trainer_controller_1.TrainerControllers.getTrainer);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), trainer_controller_1.TrainerControllers.getAllTrainers);
router.delete('/:trainerID', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), trainer_controller_1.TrainerControllers.deleteTrainer);
exports.TrainerRoutes = router;
