import { z } from 'zod'
import { UserRoleEnum } from './user.constant'

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required.' }),
    phone: z.string({ required_error: 'Phone is required.' }),
    email: z.string().email().optional(),
    pasword: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(20, { message: 'Password can not be more than 20 characters' })
      .optional(),
  }),
})

const changeStatusValidationSchema = z.object({
  body: z.object({
    // status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
})

const updateUserRoleValidationSchema = z.object({
  body: z.object({
    role: z.enum([...UserRoleEnum] as [string, ...string[]]),
  }),
})
export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
  updateUserRoleValidationSchema,
}
