import express from 'express'
import auth from '../../middlewares/auth'

import { USER_ROLE } from '../User/user.constant'
import { TrainerControllers } from './admin.controller'

const router = express.Router()

router.get(
  '/create-trainer',
  auth(USER_ROLE.admin),
  TrainerControllers.createNewTrainer,
)

export const TrainerRoutes = router
