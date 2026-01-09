import type { CustomersResponse } from '../types'
import { buildQuery, requestJson } from './client'

type CustomersParams = {
  from?: string
  to?: string
  page?: number
  limit?: number
  sortBy?: 'asc' | 'desc'
  name?: string
}

export const getCustomers = (params: CustomersParams) => {
  const query = buildQuery({
    from: params.from && params.to ? params.from : undefined,
    to: params.from && params.to ? params.to : undefined,
    sortBy: params.sortBy,
    name: params.name,
    page: params.page,
    limit: params.limit,
  })
  return requestJson<CustomersResponse>(`/api/customers${query}`)
}
