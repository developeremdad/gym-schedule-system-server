import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingServices } from './booking.service'

const createNewBooking: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class booked successfully',
    data: result,
  })
})

export const BookingControllers = {
  createNewBooking,
}
