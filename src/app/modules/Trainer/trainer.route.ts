import express from 'express'
import auth from '../../middlewares/auth'

import { USER_ROLE } from '../User/user.constant'
import { TrainerControllers } from './trainer.controller'

const router = express.Router()

router.post(
  '/create',
  auth(USER_ROLE.admin),
  TrainerControllers.createNewTrainer,
)

router.get(
  '/my-class-schedule',
  auth(USER_ROLE.trainer),
  TrainerControllers.getTrainerClassSchedule,
)

router.patch(
  '/:trainerId',
  auth(USER_ROLE.admin),
  TrainerControllers.updateTrainer,
)

router.get('/:trainerId', auth(USER_ROLE.admin), TrainerControllers.getTrainer)

router.get('/', auth(USER_ROLE.admin), TrainerControllers.getAllTrainers)

router.delete(
  '/:trainerID',
  auth(USER_ROLE.admin),
  TrainerControllers.deleteTrainer,
)

export const TrainerRoutes = router
