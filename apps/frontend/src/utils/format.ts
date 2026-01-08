export const numberFormatter = new Intl.NumberFormat('ko-KR')

export const formatRange = (range: string) => {
  const [min, max] = range.split(' - ')
  const minValue = Number(min)
  const maxValue = max === 'Infinity' ? null : Number(max)
  if (!Number.isFinite(minValue)) return range
  if (!maxValue) return `${numberFormatter.format(minValue)}+`
  return `${numberFormatter.format(minValue)} - ${numberFormatter.format(maxValue)}`
}
