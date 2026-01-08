import { useQuery } from '@tanstack/react-query'
import { getPurchaseFrequency } from '../api/purchaseFrequency'

type UsePurchaseFrequencyParams = {
  from?: string
  to?: string
}

const isDateRangeReady = (from?: string, to?: string) => {
  const hasFrom = Boolean(from)
  const hasTo = Boolean(to)
  return (hasFrom && hasTo) || (!hasFrom && !hasTo)
}

const usePurchaseFrequency = ({ from, to }: UsePurchaseFrequencyParams) => {
  const dateReady = isDateRangeReady(from, to)

  const query = useQuery({
    queryKey: ['purchase-frequency', from ?? '', to ?? ''],
    queryFn: () => getPurchaseFrequency({ from, to }),
    enabled: dateReady,
    staleTime: 60_000,
  })

  return {
    ...query,
    dateReady,
  }
}

export default usePurchaseFrequency
