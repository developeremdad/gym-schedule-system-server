import httpStatus from 'http-status'
import config from '../../config'
import AppError from '../../errors/AppError'
import { USER_ROLE } from '../User/user.constant'
import { User } from '../User/user.model'

const createTrainerIntoDB = async (payload: Record<string, unknown>) => {
  // Check if the user already has a trainer
  const user = await User.findOne({ email: payload.email })
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already has a trainer')
  }
  //if password is not given , use default password
  payload.password = payload.password || (config.default_password as string)
  payload.role = USER_ROLE.trainer

  try {
    // create a user
    const newUser = await User.create(payload)

    //create a user
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to register user')
    }

    return newUser
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err)
  }
}

export const TrainerServices = {
  createTrainerIntoDB,
}
