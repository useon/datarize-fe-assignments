import { useQuery } from '@tanstack/react-query'
import { getCustomers } from '../api/customers'

type UseCustomersParams = {
  from?: string
  to?: string
  page?: number
  limit?: number
  sortBy?: 'asc' | 'desc'
}

const isDateRangeReady = (from?: string, to?: string) => {
  const hasFrom = Boolean(from)
  const hasTo = Boolean(to)
  return (hasFrom && hasTo) || (!hasFrom && !hasTo)
}

const useCustomers = ({ from, to, page = 1, limit = 20, sortBy }: UseCustomersParams) => {
  const dateReady = isDateRangeReady(from, to)

  const query = useQuery({
    queryKey: ['customers', { from: from ?? '', to: to ?? '', page, limit, sortBy: sortBy ?? '' }],
    queryFn: () => getCustomers({ from, to, page, limit, sortBy }),
    enabled: dateReady,
    staleTime: 20_000,
  })

  return {
    ...query,
    dateReady,
  }
}

export default useCustomers
