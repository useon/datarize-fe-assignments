import type { CustomerPurchase } from '../types'
import { buildQuery, requestJson } from './client'

type CustomerPurchasesParams = {
  customerId: number
  from?: string
  to?: string
}

export const getCustomerPurchases = (params: CustomerPurchasesParams) => {
  const query = params.from && params.to ? buildQuery({ from: params.from, to: params.to }) : ''
  return requestJson<CustomerPurchase[]>(`/api/customers/${params.customerId}/purchases${query}`)
}
