"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassScheduleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const classSchedule_controller_1 = require("./classSchedule.controller");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), classSchedule_controller_1.ClassScheduleControllers.createClassSchedule);
router.patch('/assign-trainer/:classScheduleId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), classSchedule_controller_1.ClassScheduleControllers.assigningTrainerToClassSchedule);
router.delete('/:classScheduleId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), classSchedule_controller_1.ClassScheduleControllers.deleteClassSchedule);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.trainee), classSchedule_controller_1.ClassScheduleControllers.getAllClassSchedules);
exports.ClassScheduleRoutes = router;
