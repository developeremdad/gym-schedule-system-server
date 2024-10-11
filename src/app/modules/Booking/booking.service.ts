import httpStatus from 'http-status'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { ClassSchedule } from '../ClassSchedule/classSchedule.model'
import { User } from '../User/user.model'
import { Booking } from './booking.model'

export const createBookingIntoDB = async (
  classScheduleID: string,
  traineeID: string,
) => {
  try {
    // Find the class schedule
    const classSchedule = await ClassSchedule.findById(classScheduleID)
    if (!classSchedule) {
      throw new AppError(httpStatus.BAD_REQUEST, "'Class schedule not found")
    }

    // Check if the class is already full
    if (classSchedule.trainees.length >= classSchedule.maxTrainees) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Class schedule is full. Maximum 10 trainees allowed per schedule.',
      )
    }

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

    const bookingData = {
      classSchedule: classScheduleID,
      trainee: traineeID,
      trainer: classSchedule.trainer,
    }

    // Create the booking
    const result = await Booking.create([bookingData])

    // Add trainee to the class schedule
    const traineeIDObj = new mongoose.Types.ObjectId(traineeID)
    classSchedule.trainees.push(traineeIDObj)
    await classSchedule.save()

    return result
  } catch (err: any) {
    throw new Error(err)
  }
}

const cancelBookingIntoDB = async (bookingID: string) => {
  try {
    // Find the booking
    const booking = await Booking.findById(bookingID)
    if (!booking) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking not found')
    }

    // Remove the trainee from the class schedule
    const classSchedule = await ClassSchedule.findById(booking.classSchedule)
    if (classSchedule) {
      classSchedule.trainees = classSchedule.trainees.filter(
        (traineeID) => traineeID.toString() !== booking.trainee.toString(),
      )
      await classSchedule.save()
    }

    // Delete the booking
    const result = await Booking.findByIdAndDelete(bookingID)

    return result
  } catch (err: any) {
    throw new Error(err)
  }
}

const getAllTraineeBookings = async (traineeID: string) => {
  try {
    // Find all bookings for the trainee
    const bookings = await Booking.find({ trainee: traineeID }).populate(
      'classSchedule',
    )

    if (!bookings.length) {
      throw new AppError(httpStatus.NOT_FOUND, 'No bookings found')
    }

    return bookings
  } catch (err: any) {
    throw new Error(err)
  }
}

const getMyAllBookingFromDB = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  const bookings = await Booking.find({ trainee: userId }).populate(
    'classSchedule',
  )
  return bookings
}

export const BookingServices = {
  createBookingIntoDB,
  cancelBookingIntoDB,
  getAllTraineeBookings,
  getMyAllBookingFromDB,
}
