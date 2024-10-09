import mongoose from 'mongoose'

export type TClassSchedule = {
  scheduleDate: Date
  startTime: string // formatted as HH:mm
  endTime: string // formatted as HH:mm
  trainer: mongoose.Types.ObjectId
}
