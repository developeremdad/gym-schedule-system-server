import express from 'express'
import auth from '../../middlewares/auth'

import { USER_ROLE } from '../User/user.constant'
import { BookingControllers } from './booking.controller'

const router = express.Router()

router.post(
  '/create/:classScheduleID',
  auth(USER_ROLE.trainee),
  BookingControllers.createNewBooking,
)

router.get(
  '/my-bookings',
  auth(USER_ROLE.trainee),
  BookingControllers.getMyAllBooking,
)

router.delete(
  '/:bookingID',
  auth(USER_ROLE.trainee),
  BookingControllers.cancelBooking,
)

export const BookingRoutes = router
