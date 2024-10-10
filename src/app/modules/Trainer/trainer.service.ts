import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import config from '../../config'
import AppError from '../../errors/AppError'
import { USER_ROLE } from '../User/user.constant'
import { TUser } from '../User/user.interface'
import { User } from '../User/user.model'

const createNewTrainerIntoDB = async (payload: TUser) => {
  //if password is not given , use default password
  payload.password = payload.password || (config.default_password as string)
  payload.role = USER_ROLE.trainer
  try {
    // create a user as a trainer
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

const getAllTrainersFromDB = async (query: Record<string, unknown>) => {
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

export const TrainerServices = {
  createNewTrainerIntoDB,
  getAllTrainersFromDB,
}
