import { useQuery } from '@tanstack/react-query'
import { getCustomerPurchases } from '../api/customerPurchases'

type UseCustomerPurchasesParams = {
  customerId?: number
  from?: string
  to?: string
}

const isDateRangeReady = (from?: string, to?: string) => {
  const hasFrom = Boolean(from)
  const hasTo = Boolean(to)
  return (hasFrom && hasTo) || (!hasFrom && !hasTo)
}

const useCustomerPurchases = ({ customerId, from, to }: UseCustomerPurchasesParams) => {
  const dateReady = isDateRangeReady(from, to)
  const enabled = Boolean(customerId) && dateReady

  const query = useQuery({
    queryKey: ['customer-purchases', { customerId: customerId ?? 0, from: from ?? '', to: to ?? '' }],
    queryFn: () => getCustomerPurchases({ customerId: customerId as number, from, to }),
    enabled,
    staleTime: 20_000,
  })

  return {
    ...query,
    dateReady,
    enabled,
  }
}

export default useCustomerPurchases
