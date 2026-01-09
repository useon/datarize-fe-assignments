const formatRangeLabel = (range: string) => {
  const [minRaw, maxRaw] = range.split(' - ')
  const min = Number(minRaw)
  const max = maxRaw === 'Infinity' ? null : Number(maxRaw)

  if (!Number.isFinite(min)) {
    return range
  }

  if (max === null) {
    const minLabel = Math.floor((min - 1) / 10000)
    return `${minLabel}만원 이상`
  }

  if (min === 0) {
    const maxLabel = Math.floor(max / 10000)
    return `${maxLabel}만원 이하`
  }

  const minLabel = Math.floor(min / 10000)
  const maxLabel = Math.floor(max / 10000)
  return `${minLabel}만원 - ${maxLabel}만원`
}

export default formatRangeLabel
