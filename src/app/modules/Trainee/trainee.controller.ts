import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TraineeServices } from './trainee.service'

const createNewTrainee: RequestHandler = catchAsync(async (req, res) => {
  const result = await TraineeServices.createNewTraineeIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Trainee register successfully',
    data: result,
  })
})

const getAllTrainees: RequestHandler = catchAsync(async (req, res) => {
  const result = await TraineeServices.getAllTraineesFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainers is retrieved successfully',
    meta: result.meta,
    data: result.result,
  })
})

export const TraineeControllers = {
  createNewTrainee,
  getAllTrainees,
}
