import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RefreshCw } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const verificationSchema = z.object({
  code: z.array(z.string()).length(6, 'Please enter all digits'),
})

type VerificationFormData = z.infer<typeof verificationSchema>

interface VerificationFormProps {
  verificationCode: string[]
  setVerificationCode: (code: string[]) => void
  isLoading: boolean
  error: string
  onSubmit: (code: string) => void
  onResendCode: () => void
}

export function VerificationForm({
  verificationCode,
  setVerificationCode,
  isLoading,
  error: serverError,
  onSubmit,
  onResendCode,
}: VerificationFormProps) {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: verificationCode,
    },
  })

  const code = watch('code')

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setValue('code', newCode)
    setVerificationCode(newCode)

    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    const newCode = [...code]

    for (let i = 0; i < pastedData.length; i++) {
      if (/[0-9]/.test(pastedData[i])) {
        newCode[i] = pastedData[i]
      }
    }

    setValue('code', newCode)
    setVerificationCode(newCode)
  }

  const onSubmitForm = (data: VerificationFormData) => {
    onSubmit(data.code.join(''))
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div>
        <Label className="mb-3 block text-center">
          Enter verification code
        </Label>

        <div className="flex justify-center gap-2">
          {code.map((digit, index) => (
            <Input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="h-12 w-12 text-center text-lg font-semibold"
              aria-invalid={!!errors.code}
              required
            />
          ))}
        </div>

        {(errors.code || serverError) && (
          <p className="text-destructive mt-2 text-center text-sm">
            {errors.code?.message || serverError}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <RefreshCw className="h-5 w-5 animate-spin" />
        ) : (
          'Verify Code'
        )}
      </Button>

      <div className="text-center">
        <p className="text-muted-foreground text-sm">
          Didnt receive the code?{' '}
          <Button
            variant="link"
            onClick={onResendCode}
            disabled={isLoading}
            className="font-medium"
          >
            Resend code
          </Button>
        </p>
      </div>
    </form>
  )
}
