import { useSuspenseQuery } from '@tanstack/react-query'
import { getPurchaseFrequency } from '../api/purchaseFrequency'

type UsePurchaseFrequencyParams = {
  from?: string
  to?: string
}

const usePurchaseFrequency = ({ from, to }: UsePurchaseFrequencyParams) => {
  return useSuspenseQuery({
    queryKey: ['purchase-frequency', { from: from ?? '', to: to ?? '' }],
    queryFn: () => getPurchaseFrequency({ from, to }),
    staleTime: 60_000,
  })
}

export default usePurchaseFrequency
