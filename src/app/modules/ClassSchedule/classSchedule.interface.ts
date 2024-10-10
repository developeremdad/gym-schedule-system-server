import mongoose from 'mongoose'

export type TClassSchedule = {
  scheduleDate: Date
  startTime: string
  endTime: string
  trainer: mongoose.Types.ObjectId
  trainees: mongoose.Types.ObjectId[]
  maxTrainees: number
}
