import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingServices } from './booking.service'

const createNewBooking: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user
  const result = await BookingServices.createBookingIntoDB(
    req.params.classScheduleID,
    user._id,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class booked successfully',
    data: result,
  })
})

const cancelBooking: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookingServices.cancelBookingIntoDB(req.params.bookingID)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cancel class booking successfully',
    data: result,
  })
})

export const BookingControllers = {
  createNewBooking,
  cancelBooking,
}
