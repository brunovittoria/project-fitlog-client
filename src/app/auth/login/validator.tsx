import { z } from 'zod'

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email inválido',
    })
    .email({
      message: 'Email inválido',
    }),
  password: z
    .string({
      required_error: 'Senha inválida',
    })
    .min(8, {
      message: 'Senha deve ter pelo menos 8 caracteres',
    }),
})

export { loginSchema }
