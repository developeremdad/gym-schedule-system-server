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
    // const classSchedule = await ClassSchedule.findById(booking.classSchedule)
    // if (classSchedule) {
    //   classSchedule.trainees = classSchedule.trainees.filter(
    //     (traineeID) => traineeID.toString() !== booking.trainee.toString(),
    //   )
    //   await classSchedule.save()
    // }

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

export const BookingServices = {
  createBookingIntoDB,
  cancelBookingIntoDB,
  getAllTraineeBookings,
}
