import mongoose from 'mongoose'

export type TBooking = {
  classSchedule: mongoose.Types.ObjectId
  trainee: mongoose.Types.ObjectId
  trainer: mongoose.Types.ObjectId
  bookingDate: Date
}
