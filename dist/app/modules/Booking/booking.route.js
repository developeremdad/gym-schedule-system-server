"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post('/create/:classScheduleID', (0, auth_1.default)(user_constant_1.USER_ROLE.trainee), booking_controller_1.BookingControllers.createNewBooking);
router.get('/my-bookings', (0, auth_1.default)(user_constant_1.USER_ROLE.trainee), booking_controller_1.BookingControllers.getMyAllBooking);
router.delete('/:bookingID', (0, auth_1.default)(user_constant_1.USER_ROLE.trainee), booking_controller_1.BookingControllers.cancelBooking);
exports.BookingRoutes = router;
