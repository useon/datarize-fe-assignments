import { useSuspenseQuery } from '@tanstack/react-query'
import { getCustomerPurchases } from '../api/customerPurchases'

type UseCustomerPurchasesParams = {
  customerId: number
  from?: string
  to?: string
}

const useCustomerPurchases = ({ customerId, from, to }: UseCustomerPurchasesParams) => {
  return useSuspenseQuery({
    queryKey: ['customer-purchases', { customerId, from: from ?? '', to: to ?? '' }],
    queryFn: () => getCustomerPurchases({ customerId, from, to }),
    staleTime: 20_000,
  })
}

export default useCustomerPurchases
