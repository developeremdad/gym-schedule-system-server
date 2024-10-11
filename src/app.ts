/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: [
      'https://devemdad-gym-schedule.vercel.app',
      'http://localhost:3000',
    ],
    credentials: true,
  }),
)

// application routes
app.use('/api/v1', router)

app.get('/', (_req: Request, res: Response) => {
  res.send('Hi, Gym Schedule System Root Route Working !')
})

app.use(globalErrorHandler)

// Global Not Found
app.use(notFound)

export default app
