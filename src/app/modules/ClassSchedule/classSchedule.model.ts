import mongoose, { Schema } from 'mongoose'
import { TClassSchedule } from './classSchedule.interface'

const ClassScheduleSchema = new Schema<TClassSchedule>(
  {
    scheduleDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
