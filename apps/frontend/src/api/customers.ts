import type { CustomersResponse } from '../types'

type CustomersParams = {
  from?: string
  to?: string
  page?: number
  limit?: number
}

const buildUrl = (params: CustomersParams) => {
  const searchParams = new URLSearchParams()
  if (params.from && params.to) {
    searchParams.set('from', params.from)
    searchParams.set('to', params.to)
  }
  if (params.page) {
    searchParams.set('page', String(params.page))
  }
  if (params.limit) {
    searchParams.set('limit', String(params.limit))
  }
  const query = searchParams.toString()
  return query ? `/api/customers?${query}` : '/api/customers'
}

export const getCustomers = async (params: CustomersParams) => {
  const response = await fetch(buildUrl(params))
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }
  return (await response.json()) as CustomersResponse
}
