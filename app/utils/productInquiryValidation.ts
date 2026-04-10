// utils/validation.ts
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const productInquirySchema = toTypedSchema(
  z.object({
    // 1. 重量校验：设为可选
    weight: z
      .string()
      .optional() // 允许不传这个字段
      .or(z.literal('')) // 关键：允许输入框为空字符串 ""
      .refine((val) => !val || !isNaN(Number(val)), { 
        message: 'Weight must be a valid number' 
      }), // 只有当用户填了内容时，才校验是否为数字

    // 2. 姓名校验：必填
    fullName: z
      .string()
      .min(1, 'Full Name is required')
      .min(2, 'Name must be at least 2 characters'),

    // 3. 邮箱校验：必填
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid work email'),

    // 4. 国家/目的地校验：必填
    country: z
      .string()
      .min(1, 'Please select a destination country'),
  })
)