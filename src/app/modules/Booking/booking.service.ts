import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { ClassSchedule } from '../ClassSchedule/classSchedule.model'
import { Booking } from './booking.model'

export const createBookingIntoDB = async (payload: Record<string, unknown>) => {
  const { classScheduleID, traineeID } = payload

  try {
    // Find the class schedule
    const classSchedule = await ClassSchedule.findById(classScheduleID)
    if (!classSchedule) {
      throw new AppError(httpStatus.BAD_REQUEST, "'Class schedule not found")
    }

    // // Check if the class is already full
    // if (classSchedule.trainees.length >= classSchedule.maxTrainees) {
    //   return res.status(400).json({ message: 'Class is full' })
    // }

    // Check if the trainee is already booked
    const existingBooking = await Booking.findOne({
      classSchedule: classScheduleID,
      trainee: traineeID,
    })
    if (existingBooking) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Trainee is already booked for this class',
      )
    }

    // Create a new booking
    const newBooking = new Booking({
      classSchedule: classScheduleID,
      trainee: traineeID,
    })

    // Save the booking
    const result = await newBooking.save()

    // Add trainee to the class schedule
    // classSchedule.trainees.push(traineeID)
    // await classSchedule.save()

    return result
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err)
  }
}

export const BookingServices = {
  createBookingIntoDB,
}
