import express from 'express'
import auth from '../../middlewares/auth'

import { USER_ROLE } from '../User/user.constant'
import { BookingControllers } from './booking.controller'

const router = express.Router()

router.get(
  '/create-booking',
  auth(USER_ROLE.admin),
  BookingControllers.createNewBooking,
)

export const BookingRoutes = router
