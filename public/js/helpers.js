function objectToParams(obj) {
  return Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&')
}

function formatDate(date, locale = 'nl-NL') {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function formatTime(time, locale = 'nl-NL') {
  return time.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
  })
}

function formatCurrency(number, locale = 'nl-NL') {
  return number.toLocaleString(locale, {
    style: 'currency',
    currency: 'EUR',
  })
}

function pad(num, size) {
  let s = String(num)
  while (s.length < size) s = `0${s}`
  return s
}