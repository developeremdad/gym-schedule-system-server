import express from 'express'
import auth from '../../middlewares/auth'

import { USER_ROLE } from '../User/user.constant'
import { TraineeControllers } from './trainee.controller'

const router = express.Router()

router.get(
  '/get-trainers',
  auth(USER_ROLE.admin),
  TraineeControllers.getAllTrainees,
)

export const TrainerRoutes = router
