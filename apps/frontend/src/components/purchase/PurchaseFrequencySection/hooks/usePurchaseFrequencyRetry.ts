import { useQueryErrorResetBoundary } from '@tanstack/react-query'

type UsePurchaseFrequencyRetryParams = {
  from?: string
  to?: string
}

const usePurchaseFrequencyRetry = ({ from, to }: UsePurchaseFrequencyRetryParams) => {
  const { reset } = useQueryErrorResetBoundary()
  const resetKey = `${from ?? ''}-${to ?? ''}`

  return {
    reset,
    resetKey,
  }
}

export default usePurchaseFrequencyRetry
