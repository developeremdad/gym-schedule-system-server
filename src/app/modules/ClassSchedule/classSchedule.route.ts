import express from 'express'
import auth from '../../middlewares/auth'

import { USER_ROLE } from '../User/user.constant'
import { ClassScheduleControllers } from './classSchedule.controller'

const router = express.Router()

router.post(
  '/create',
  auth(USER_ROLE.admin),
  ClassScheduleControllers.createClassSchedule,
)

router.get(
  '/get-class-schedules',
  auth(USER_ROLE.admin),
  ClassScheduleControllers.getAllClassSchedules,
)

export const ClassScheduleRoutes = router
