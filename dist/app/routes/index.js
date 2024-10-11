"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const booking_route_1 = require("../modules/Booking/booking.route");
const classSchedule_route_1 = require("../modules/ClassSchedule/classSchedule.route");
const trainee_route_1 = require("../modules/Trainee/trainee.route");
const trainer_route_1 = require("../modules/Trainer/trainer.route");
const user_route_1 = require("../modules/User/user.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/trainers',
        route: trainer_route_1.TrainerRoutes,
    },
    {
        path: '/trainees',
        route: trainee_route_1.TraineeRoutes,
    },
    {
        path: '/classSchedules',
        route: classSchedule_route_1.ClassScheduleRoutes,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
