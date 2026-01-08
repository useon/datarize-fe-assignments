import type { PurchaseRow } from '../types'

type PurchaseParams = {
  from?: string
  to?: string
}

const buildUrl = (params: PurchaseParams) => {
  const searchParams = new URLSearchParams()
  if (params.from && params.to) {
    searchParams.set('from', params.from)
    searchParams.set('to', params.to)
  }
  const query = searchParams.toString()
  return query ? `/api/purchases?${query}` : '/api/purchases'
}

export const getPurchases = async (params: PurchaseParams) => {
  const response = await fetch(buildUrl(params))
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }
  return (await response.json()) as PurchaseRow[]
}
