export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateForm(fields) {
  const errors = {}
  let isValid = true

  fields.forEach((field) => {
    const { value, name, required, type } = field
    if (required && (!value || !value.trim())) {
      errors[name] = `Por favor ingresa tu ${name}`
      isValid = false
    } else if (type === 'email' && value && !isValidEmail(value.trim())) {
      errors[name] = 'Por favor ingresa un email válido'
      isValid = false
    }
  })

  return { isValid, errors }
}

export function getFieldError(name, errors) {
  return errors[name] || ''
}