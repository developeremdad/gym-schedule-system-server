import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { USER_ROLE } from '../User/user.constant'
import { TUser } from '../User/user.interface'
import { User } from '../User/user.model'

const createNewTraineeIntoDB = async (payload: TUser) => {
  payload.role = USER_ROLE.trainee
  try {
    // create a user as a trainer
    const newUser = await User.create([payload])

    //create a user
    if (!newUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to register new trainee user',
      )
    }

    return newUser
  } catch (err: any) {
    throw new Error(err)
  }
}

const getAllTraineesFromDB = async (query: Record<string, unknown>) => {
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

export const TraineeServices = {
  getAllTraineesFromDB,
  createNewTraineeIntoDB,
}
