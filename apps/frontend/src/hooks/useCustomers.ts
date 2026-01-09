import { useSuspenseQuery } from '@tanstack/react-query'
import { getCustomers } from '../api/customers'

type UseCustomersParams = {
  from?: string
  to?: string
  page?: number
  limit?: number
  sortBy?: 'asc' | 'desc'
  name?: string
}

const useCustomers = ({ from, to, page = 1, limit = 20, sortBy, name }: UseCustomersParams) => {
  return useSuspenseQuery({
    queryKey: [
      'customers',
      {
        from: from ?? '',
        to: to ?? '',
        page,
        limit,
        sortBy: sortBy ?? '',
        name: name ?? '',
      },
    ],
    queryFn: () => getCustomers({ from, to, page, limit, sortBy, name }),
    staleTime: 20_000,
  })
}

export default useCustomers
