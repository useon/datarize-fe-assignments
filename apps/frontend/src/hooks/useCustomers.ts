import { useQuery } from '@tanstack/react-query'
import { getCustomers } from '../api/customers'

type UseCustomersParams = {
  from?: string
  to?: string
  page?: number
  limit?: number
}

const isDateRangeReady = (from?: string, to?: string) => {
  const hasFrom = Boolean(from)
  const hasTo = Boolean(to)
  return (hasFrom && hasTo) || (!hasFrom && !hasTo)
}

const useCustomers = ({ from, to, page = 1, limit = 20 }: UseCustomersParams) => {
  const dateReady = isDateRangeReady(from, to)

  const query = useQuery({
    queryKey: ['customers', { from: from ?? '', to: to ?? '', page, limit }],
    queryFn: () => getCustomers({ from, to, page, limit }),
    enabled: dateReady,
    staleTime: 20_000,
  })

  return {
    ...query,
    dateReady,
  }
}

export default useCustomers
