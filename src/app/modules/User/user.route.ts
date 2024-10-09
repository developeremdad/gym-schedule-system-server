/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from './user.constant'
import { UserControllers } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
)

router.get(
  '/get-users',
  // auth(
  //   USER_ROLE.superAdmin,
  //   USER_ROLE.manager,
  // ),
  UserControllers.getAllUsers,
)

router.get(
  '/me',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.manager,
    USER_ROLE.bAdmin,
    USER_ROLE.fUser,
    USER_ROLE.user,
  ),
  UserControllers.getMe,
)

router.post(
  '/change-status/:phone',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
)

router.patch(
  '/change-role/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  validateRequest(UserValidation.updateUserRoleValidationSchema),
  UserControllers.updateUserRole,
)

router.delete(
  '/delete-user/:id',
  auth(USER_ROLE.superAdmin),
  UserControllers.deleteUser,
)

export const UserRoutes = router
