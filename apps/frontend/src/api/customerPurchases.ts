import type { CustomerPurchase } from '../types'

type CustomerPurchasesParams = {
  customerId: number
  from?: string
  to?: string
}

const buildUrl = ({ customerId, from, to }: CustomerPurchasesParams) => {
  const searchParams = new URLSearchParams()
  if (from && to) {
    searchParams.set('from', from)
    searchParams.set('to', to)
  }
  const query = searchParams.toString()
  return query ? `/api/customers/${customerId}/purchases?${query}` : `/api/customers/${customerId}/purchases`
}

export const getCustomerPurchases = async (params: CustomerPurchasesParams) => {
  const response = await fetch(buildUrl(params))
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }
  return (await response.json()) as CustomerPurchase[]
}
