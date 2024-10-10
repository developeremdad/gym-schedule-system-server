import mongoose, { Schema } from 'mongoose'
import { TClassSchedule } from './classSchedule.interface'

const ClassScheduleSchema = new Schema<TClassSchedule>(
  {
    scheduleDate: {
      type: Date,
      required: [true, 'Schedule date is required'],
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    trainees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    maxTrainees: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  },
)

export const ClassSchedule = mongoose.model<TClassSchedule>(
  'ClassSchedule',
  ClassScheduleSchema,
)
