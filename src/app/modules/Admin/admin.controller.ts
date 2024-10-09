import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TrainerServices } from './admin.service'

const createNewTrainer: RequestHandler = catchAsync(async (req, res) => {
  const result = await TrainerServices.createTrainerIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer is created successfully',
    data: result,
  })
})

export const TrainerControllers = {
  createNewTrainer,
}
