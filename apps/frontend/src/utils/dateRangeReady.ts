export const isDateRangeReady = (from?: string, to?: string) => {
  const hasFrom = Boolean(from)
  const hasTo = Boolean(to)
  return (hasFrom && hasTo) || (!hasFrom && !hasTo)
}
