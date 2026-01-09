import { isDateRangeReady } from '../../../../utils/dateRangeReady'

type UseCustomerDetailMetaParams = {
  customerName?: string
  from?: string
  to?: string
}

const useCustomerDetailMeta = ({ customerName, from, to }: UseCustomerDetailMetaParams) => {
  const title = customerName ? `${customerName} 구매 내역` : '고객 구매 내역'
  const periodLabel = from && to ? `${from} ~ ${to}` : '전체 기간'
  const dateReady = isDateRangeReady(from, to)

  return {
    title,
    periodLabel,
    dateReady,
  }
}

export default useCustomerDetailMeta
