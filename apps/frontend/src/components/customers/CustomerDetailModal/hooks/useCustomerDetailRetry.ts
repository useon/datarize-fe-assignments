import { useQueryErrorResetBoundary } from '@tanstack/react-query'

type UseCustomerDetailRetryParams = {
  customerId?: number
  from?: string
  to?: string
}

const useCustomerDetailRetry = ({ customerId, from, to }: UseCustomerDetailRetryParams) => {
  const { reset } = useQueryErrorResetBoundary()
  const resetKey = `${customerId ?? 0}-${from ?? ''}-${to ?? ''}`

  return {
    reset,
    resetKey,
  }
}

export default useCustomerDetailRetry
