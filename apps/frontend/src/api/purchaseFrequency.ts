import type { PurchaseFrequency } from '../types'
import { buildQuery, requestJson } from './client'

type PurchaseFrequencyParams = {
  from?: string
  to?: string
}

export const getPurchaseFrequency = (params: PurchaseFrequencyParams) => {
  const query = params.from && params.to ? buildQuery({ from: params.from, to: params.to }) : ''
  return requestJson<PurchaseFrequency[]>(`/api/purchase-frequency${query}`)
}
