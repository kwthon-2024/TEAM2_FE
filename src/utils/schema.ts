import { z } from 'zod'

const currentYear = new Date().getFullYear()

export const signupSchema = z.object({
  userId: z
    .string()
    .min(6, { message: '아이디는 6글자 이상입니다.' })
    .max(12, { message: '아이디는 12글자 이하입니다.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8글자 이상입니다.' })
    .max(16, { message: '비밀번호는 16글자 이하입니다.' }),
  confirm: z.string(),
  nickname: z
    .string()
    .min(2, { message: '닉네임은 2글자 이상입니다.' })
    .max(16, { message: '닉네임은 8글자 이하입니다.' }),
  dischargeYear: z
    .string()
    .transform((value) => parseInt(value, 10))
    .refine((val) => val >= currentYear - 4 && val <= currentYear, {
      message: `${currentYear - 4}년부터 현재 연도까지만 입력 가능합니다.`,
    }),
  militaryChaplain: z.string(),
})
