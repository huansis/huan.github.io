import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export const categorySchema = toTypedSchema(
  z.object({
    // 2. Email 校验
    // 解决提示：现代 Zod 建议先检查 min(1) 确保必填，再检查 email 格式
    email: z
      .string()
      .min(1, 'Email address is required') // 必填提示
      .email('Please enter a valid email address'), // 格式错误提示
  })
);