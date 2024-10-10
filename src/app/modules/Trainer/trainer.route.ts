import express from 'express'
import auth from '../../middlewares/auth'

import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../User/user.constant'
import { UserValidation } from '../User/user.validation'
import { TrainerControllers } from './trainer.controller'

const router = express.Router()

router.post(
  '/create',
  auth(USER_ROLE.admin),
  TrainerControllers.createNewTrainer,
)
router.get(
  '/get-trainers',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.userValidationSchema),
  TrainerControllers.getAllTrainers,
)

export const TrainerRoutes = router
