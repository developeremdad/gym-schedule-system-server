import { Router } from 'express'
import { AuthRoutes } from '../modules/Auth/auth.route'

import { TraineeRoutes } from '../modules/Trainee/trainee.route'
import { TrainerRoutes } from '../modules/Trainer/trainer.route'
import { UserRoutes } from '../modules/User/user.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/trainers',
    route: TrainerRoutes,
  },
  {
    path: '/trainees',
    route: TraineeRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
