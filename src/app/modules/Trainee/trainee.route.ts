import express from 'express'
import auth from '../../middlewares/auth'

import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../User/user.constant'
import { UserValidation } from '../User/user.validation'
import { TraineeControllers } from './trainee.controller'

const router = express.Router()

router.post(
  '/create',
  validateRequest(UserValidation.userValidationSchema),
  TraineeControllers.createNewTrainee,
)
router.get(
  '/get-trainees',
  auth(USER_ROLE.admin),
  TraineeControllers.getAllTrainees,
)

export const TraineeRoutes = router
