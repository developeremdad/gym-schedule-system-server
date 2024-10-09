import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from './user.constant'
import { UserControllers } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
)

router.get(
  '/get-users',
  auth(USER_ROLE.admin, USER_ROLE.trainee),
  UserControllers.getAllUsers,
)

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.trainer, USER_ROLE.trainee),
  UserControllers.getMe,
)

router.patch(
  '/change-role/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.updateUserRoleValidationSchema),
  UserControllers.updateUserRole,
)

router.delete(
  '/delete-user/:id',
  auth(USER_ROLE.admin),
  UserControllers.deleteUser,
)

export const UserRoutes = router
