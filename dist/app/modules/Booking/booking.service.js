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
exports.BookingServices = exports.createBookingIntoDB = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const classSchedule_model_1 = require("../ClassSchedule/classSchedule.model");
const user_model_1 = require("../User/user.model");
const booking_model_1 = require("./booking.model");
const createBookingIntoDB = (classScheduleID, traineeID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the class schedule
        const classSchedule = yield classSchedule_model_1.ClassSchedule.findById(classScheduleID);
        if (!classSchedule) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "'Class schedule not found");
        }
        // Check if the class is already full
        if (classSchedule.trainees.length >= classSchedule.maxTrainees) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Class schedule is full. Maximum 10 trainees allowed per schedule.');
        }
        // Check if the trainee is already booked
        const existingBooking = yield booking_model_1.Booking.findOne({
            classSchedule: classScheduleID,
            trainee: traineeID,
        });
        if (existingBooking) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Trainee is already booked for this class');
        }
        const bookingData = {
            classSchedule: classScheduleID,
            trainee: traineeID,
            trainer: classSchedule.trainer,
        };
        // Create the booking
        const result = yield booking_model_1.Booking.create([bookingData]);
        // Add trainee to the class schedule
        const traineeIDObj = new mongoose_1.default.Types.ObjectId(traineeID);
        classSchedule.trainees.push(traineeIDObj);
        yield classSchedule.save();
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.createBookingIntoDB = createBookingIntoDB;
const cancelBookingIntoDB = (bookingID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the booking
        const booking = yield booking_model_1.Booking.findById(bookingID);
        if (!booking) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
        }
        // Remove the trainee from the class schedule
        const classSchedule = yield classSchedule_model_1.ClassSchedule.findById(booking.classSchedule);
        if (classSchedule) {
            classSchedule.trainees = classSchedule.trainees.filter((traineeID) => traineeID.toString() !== booking.trainee.toString());
            yield classSchedule.save();
        }
        // Delete the booking
        const result = yield booking_model_1.Booking.findByIdAndDelete(bookingID);
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
});
const getAllTraineeBookings = (traineeID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find all bookings for the trainee
        const bookings = yield booking_model_1.Booking.find({ trainee: traineeID }).populate('classSchedule');
        if (!bookings.length) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No bookings found');
        }
        return bookings;
    }
    catch (err) {
        throw new Error(err);
    }
});
const getMyAllBookingFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const bookings = yield booking_model_1.Booking.find({ trainee: userId }).populate('classSchedule');
    return bookings;
});
exports.BookingServices = {
    createBookingIntoDB: exports.createBookingIntoDB,
    cancelBookingIntoDB,
    getAllTraineeBookings,
    getMyAllBookingFromDB,
};
