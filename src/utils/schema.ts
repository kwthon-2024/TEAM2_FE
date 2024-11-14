import { z } from 'zod'

const currentYear = new Date().getFullYear()

export const loginSchema = z.object({
  userId: z.string().min(1, { message: '아이디를 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
})

export const signupSchema = z
  .object({
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
  .partial()
  .refine((data) => data.password === data.confirm, {
    path: ['confirm'],
    message: '비밀번호가 일치하지 않습니다.',
  })
  .refine((data) => data.militaryChaplain !== undefined, {
    path: ['militaryChaplain'],
    message: '군종을 선택해주세요.',
  })

export const accountSchema = z
  .object({
    nickname: z
      .string()
      .min(2, { message: '닉네임은 2글자 이상입니다.' })
      .max(16, { message: '닉네임은 8글자 이하입니다.' }),
    dischargeYear: z
      .union([z.string(), z.number()])
      .transform((value) => (typeof value === 'string' ? parseInt(value, 10) : value))
      .refine((val) => val >= currentYear - 4 && val <= currentYear, {
        message: `${currentYear - 4}년부터 현재 연도까지만 입력 가능합니다.`,
      }),
    militaryChaplain: z.string(),
  })
  .partial()
  .refine((data) => data.militaryChaplain !== undefined, {
    path: ['militaryChaplain'],
    message: '군종을 선택해주세요.',
  })

export const carpoolSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }),
  trainingDate: z.string().min(1, { message: '훈련 날짜를 입력해주세요.' }),
  departPlace: z.string().min(1, { message: '출발 장소를 입력해주세요.' }),
  personnel: z
    .union([z.string(), z.number()])
    .transform((value) => (typeof value === 'string' ? parseInt(value, 10) : value)),
  hour: z.union([z.string(), z.number()]),
  minute: z.union([z.string(), z.number()]),
  price: z.union([z.string(), z.number()]),
  content: z.string(),
})

export const teammateSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }),
  trainingDate: z.string().min(1, { message: '훈련 날짜를 입력해주세요.' }),
  meetingPlace: z.string().min(1, { message: '출발 장소를 입력해주세요.' }),
  personnel: z
    .union([z.string(), z.number()])
    .transform((value) => (typeof value === 'string' ? parseInt(value, 10) : value)),
  hour: z.union([z.string(), z.number()]),
  minute: z.union([z.string(), z.number()]),
  content: z.string(),
})

export const busSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  studentId: z.string().length(10, { message: '학번은 10자리 숫자여야 합니다.' }),
  phoneNumber: z
    .string()
    .min(9, { message: '전화번호를 확인해주세요.' })
    .max(11, { message: '전화번호는 11자리 이하입니다.' }),
})

export const busReserveInfoSchema = z.object({
  studentId: z.string().length(10, { message: '학번은 10자리 숫자여야 합니다.' }),
})
