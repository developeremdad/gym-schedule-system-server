import httpStatus from 'http-status'
import moment from 'moment-timezone'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { User } from '../User/user.model'
import { TClassSchedule } from './classSchedule.interface'
import { ClassSchedule } from './classSchedule.model'

const createClassScheduleIntoDB = async (payload: TClassSchedule) => {
  try {
    // Find the trainer
    const trainer = await User.findById(payload.trainer)
    if (!trainer) {
      throw new AppError(httpStatus.NOT_FOUND, 'Trainer not found')
    }

    // Check if 5 classes are already scheduled for the same day
    const scheduledClasses = await ClassSchedule.find({
      scheduleDate: payload.scheduleDate,
    })

    // console.log(scheduledClasses)

    if (scheduledClasses.length >= 5) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "'Maximum of 5 classes allowed per day",
      )
    }

    // Parse start and end times
    const startTime = moment
      .tz(`${payload.scheduleDate} ${payload.startTime}`, 'Asia/Dhaka')
      .toDate()
    const endTime = moment
      .tz(`${payload.scheduleDate} ${payload.endTime}`, 'Asia/Dhaka')
      .toDate()

    // Check for overlapping schedules
    const overlappingSchedule = await ClassSchedule.findOne({
      scheduleDate: payload.scheduleDate,
      $or: [
        {
          startTime: { $lt: endTime, $gte: startTime },
        },
        {
          endTime: { $gt: startTime, $lte: endTime },
        },
      ],
    })

    if (overlappingSchedule) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'A class is already scheduled at the same time',
      )
    }

    // Calculate the difference in milliseconds
    const timeDifference = endTime.getTime() - startTime.getTime()

    // Convert milliseconds to hours
    const durationInHours = timeDifference / (1000 * 60 * 60)

    // Check if the duration is exactly 2 hours
    if (durationInHours !== 2) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Class schedule duration must be exactly 2 hours',
      )
    }

    payload.startTime = String(startTime)
    payload.endTime = String(endTime)

    // Continue to create the class schedule in the database
    const result = await ClassSchedule.create([payload])
    return result
  } catch (err: any) {
    throw new Error(err.message || 'Error creating class schedule')
  }
}

const getAllClassScheduleFromDB = async (query: Record<string, unknown>) => {
  const buildingQuery = new QueryBuilder(ClassSchedule.find(), query)
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

export const ClassScheduleServices = {
  createClassScheduleIntoDB,
  getAllClassScheduleFromDB,
}
