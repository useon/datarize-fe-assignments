export const escapeCsv = (value: string | number) => {
  const stringValue = String(value)
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  return stringValue
}

export const createCsvContent = (headers: string[], rows: Array<Array<string | number>>) => {
  const headerLine = headers.join(',')
  const dataLines = rows.map((row) => row.map(escapeCsv).join(','))
  return [headerLine, ...dataLines].join('\n')
}

export const downloadCsv = (filename: string, content: string) => {
  const blob = new Blob([`\ufeff${content}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
