import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TrainerServices } from './trainer.service'

const createNewTrainer: RequestHandler = catchAsync(async (req, res) => {
  const result = await TrainerServices.createNewTrainerIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create new trainer successfully',
    data: result,
  })
})

const getTrainerClassSchedule: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user
  const result = await TrainerServices.getTrainerClassScheduleFromDB(user._id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer class schedule retrieve successfully',
    data: result,
  })
})

const getTrainer: RequestHandler = catchAsync(async (req, res) => {
  const result = await TrainerServices.getTrainerFromDB(req.params.trainerId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer is retrieved successfully',
    data: result,
  })
})

const updateTrainer: RequestHandler = catchAsync(async (req, res) => {
  const result = await TrainerServices.updateTrainerInDB(
    req.params.trainerId,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Trainer successfully',
    data: result,
  })
})

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

const deleteTrainer: RequestHandler = catchAsync(async (req, res) => {
  const result = await TrainerServices.deleteTrainerIntoDB(req.params.trainerID)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete trainer successfully',
    data: result,
  })
})

export const TrainerControllers = {
  createNewTrainer,
  getTrainerClassSchedule,
  updateTrainer,
  getTrainer,
  getAllTrainers,
  deleteTrainer,
}
