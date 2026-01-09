import type { PurchaseRow } from '../types'
import { buildQuery, requestJson } from './client'

type PurchaseParams = {
  from?: string
  to?: string
}

export const getPurchases = (params: PurchaseParams) => {
  const query = params.from && params.to ? buildQuery({ from: params.from, to: params.to }) : ''
  return requestJson<PurchaseRow[]>(`/api/purchases${query}`)
}
