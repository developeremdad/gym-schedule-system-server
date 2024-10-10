import mongoose, { Schema } from 'mongoose'
import { TBooking } from './booking.interface'

const BookingSchema = new Schema<TBooking>(
  {
    classSchedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClassSchedule',

      required: [true, 'Class schedule is required'],
    },
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Trainee is required'],
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Trainer is required'],
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Prevent duplicate bookings for the same schedule by the same trainee
// BookingSchema.index({ classSchedule: 1, trainee: 1 }, { unique: true })

export const Booking = mongoose.model<TBooking>('Booking', BookingSchema)
