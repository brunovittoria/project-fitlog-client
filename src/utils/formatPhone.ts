export function formatPhoneNumber(value: string): string {
  if (!value) return ''

  const phoneNumber = value.replace(/\D/g, '')

  if (phoneNumber.length <= 11) {
    return phoneNumber
      .replace(/^(\d{2})/, '($1) ')
      .replace(/(\d{5})(\d)/, '$1-$2')
  }

  return phoneNumber
}

export function removePhoneFormat(value: string): string {
  return value.replace(/\D/g, '')
}
