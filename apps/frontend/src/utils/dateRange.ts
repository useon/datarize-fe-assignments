export const normalizeDateRange = (from: string, to: string) => {
  if (from && !to) {
    return { from, to: from }
  }
  if (!from && to) {
    return { from: to, to }
  }
  return { from, to }
}
