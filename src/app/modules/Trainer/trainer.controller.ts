import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TrainerServices } from './trainer.service'
import { RequestHandler } from 'express'

const getAllTrainers: RequestHandler = catchAsync(async (req, res) => {
  const result = await TrainerServices.getAllTrainersFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainers is retrieved successfully',
    meta: result.meta,
    data: result.result,
  })
})

export const TrainerControllers = {
  getAllTrainers,
}
