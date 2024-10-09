/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import config from '../../config'
import AppError from '../../errors/AppError'
import { TUser } from './user.interface'
import { User } from './user.model'

const createUserIntoDB = async (payload: TUser) => {
  //if password is not given , use default password
  payload.password = payload.password || (config.default_password as string)

  try {
    // create a user
    const newUser = await User.create([payload])

    //create a user
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to register user')
    }

    return newUser
  } catch (err: any) {
    throw new Error(err)
  }
}

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const buildingQuery = new QueryBuilder(User.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await buildingQuery.countTotal()
  const result = await buildingQuery.modelQuery

  return {
    meta,
    result,
  }
}

const getMe = async (phone: string, role: string) => {
  return await User.findOne({ phone, role })
}

const updateUserRoleIntoDB = async (id: string, payload: { role: string }) => {
  const user = await User.findById(id)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  const updateUser = await User.findByIdAndUpdate(
    id,
    { role: payload?.role },
    { runValidators: true, new: true },
  )
  return updateUser
}

const deleteUserIntoDB = async (id: string) => {
  const user = await User.findById(id)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }
  const result = await User.findByIdAndDelete(id)
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getMe,
  updateUserRoleIntoDB,
  deleteUserIntoDB,
}
