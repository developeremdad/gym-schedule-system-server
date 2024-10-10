import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ClassScheduleServices } from './classSchedule.service'

const createClassSchedule: RequestHandler = catchAsync(async (req, res) => {
  const result = await ClassScheduleServices.createClassScheduleIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class schedule created successfully',
    data: result,
  })
})

const getAllClassSchedules: RequestHandler = catchAsync(async (req, res) => {
  const result = await ClassScheduleServices.getAllClassScheduleFromDB(
    req.query,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class Schedule is retrieved successfully',
    meta: result.meta,
    data: result.result,
  })
})

export const ClassScheduleControllers = {
  createClassSchedule,
  getAllClassSchedules,
}
