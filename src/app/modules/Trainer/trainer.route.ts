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
  '/get-trainers',
  auth(USER_ROLE.admin),
  TrainerControllers.getAllTrainers,
)

export const TrainerRoutes = router
