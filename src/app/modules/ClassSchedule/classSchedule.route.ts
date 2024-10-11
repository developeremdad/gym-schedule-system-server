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

router.patch(
  '/assign-trainer/:classScheduleId',
  auth(USER_ROLE.admin),
  ClassScheduleControllers.assigningTrainerToClassSchedule,
)

router.delete(
  '/:classScheduleId',
  auth(USER_ROLE.admin),
  ClassScheduleControllers.deleteClassSchedule,
)

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.trainee),
  ClassScheduleControllers.getAllClassSchedules,
)

export const ClassScheduleRoutes = router
