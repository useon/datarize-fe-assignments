import type { PurchaseFrequency } from '../types'

type PurchaseFrequencyParams = {
  from?: string
  to?: string
}

const buildUrl = (params: PurchaseFrequencyParams) => {
  const searchParams = new URLSearchParams()
  if (params.from && params.to) {
    searchParams.set('from', params.from)
    searchParams.set('to', params.to)
  }
  const query = searchParams.toString()
  return query ? `/api/purchase-frequency?${query}` : '/api/purchase-frequency'
}

export const getPurchaseFrequency = async (params: PurchaseFrequencyParams) => {
  const response = await fetch(buildUrl(params))
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }
  return (await response.json()) as PurchaseFrequency[]
}
