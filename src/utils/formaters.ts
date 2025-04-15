import { format, getTime } from 'date-fns'

type InputValue = Date | string | number | null | undefined

export function fDate(date: InputValue, newFormat?: string): string {
  const fm = newFormat || 'dd MMM yyyy'

  return date ? format(new Date(date), fm) : ''
}

export function fDateTime(date: InputValue, newFormat?: string): string {
  const fm = newFormat || 'dd MMM yyyy p'

  return date ? format(new Date(date), fm) : ''
}

export function fTimestamp(date: InputValue): number | '' {
  return date ? getTime(new Date(date)) : ''
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100)
}

export const formatCurrencyFromNumber = (num: number): string => {
  const value = Number(num)
  const formattedValue = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  return formattedValue
}

export function formatCNPJ(cnpj: string): string {
  cnpj = cnpj?.replace(/\D/g, '')

  return cnpj?.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5',
  )
}

export function formatPercentage(number: string | number): string {
  if (typeof number === 'string') {
    number = parseFloat(number)
  }
  return new Intl.NumberFormat('pt-br', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number / 10000)
}

export const formatFeePercentage = (value: number | undefined): string => {
  if (value === undefined || value === null) return ''
  return `${Number(value)
    .toFixed(2)
    .replace(/\.?0+$/, '')}%`
}

export function formatCPF(cpf: string): string {
  cpf = cpf.replace(/\D/g, '')
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
}

export function handleDocument(document: string): string {
  if (document?.replace(/\D/g, '')?.length === 11) {
    return formatCPF(document)
  }
  return formatCNPJ(document)
}

export function formatPhoneNumber(phone: string): string {
  phone = phone?.replace(/\D/g, '')

  return phone?.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
}

export function formatZipCode(zipCode: string): string {
  zipCode = zipCode?.replace(/\D/g, '')

  return zipCode?.replace(/^(\d{5})(\d{3})$/, '$1-$2')
}

export function handleFilterToNumber(filter: string): number {
  switch (filter) {
    case '7d':
      return -7

    case '14d':
      return -14

    case '1m':
      return -30

    case '6m':
      return -180

    case '1a':
      return -365

    default:
      return -7
  }
}
