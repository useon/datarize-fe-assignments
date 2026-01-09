import { Suspense } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import useCustomerPurchases from '../../../hooks/useCustomerPurchases'
import type { CustomerPurchase } from '../../../types'
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary'
import ErrorFallback from '../../common/ErrorFallback/ErrorFallback'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import * as styles from './CustomerDetailModal.styles'

type CustomerDetailModalProps = {
  isOpen: boolean
  customerId?: number
  customerName?: string
  from?: string
  to?: string
  onClose: () => void
}

type CustomerPurchasesContentProps = {
  customerId: number
  from?: string
  to?: string
}

const CustomerPurchasesContent = ({ customerId, from, to }: CustomerPurchasesContentProps) => {
  const { data } = useCustomerPurchases({ customerId, from, to })

  if (data.length === 0) {
    return <div css={styles.statusBox}>해당 기간에 구매 내역이 없습니다.</div>
  }

  return (
    <div>
      {data.map((purchase: CustomerPurchase, index) => (
        <div key={`${purchase.date}-${index}`} css={styles.purchaseItem}>
          <img src={purchase.imgSrc} alt={purchase.product} />
          <div>
            <div css={styles.purchaseTitle}>{purchase.product}</div>
            <div css={styles.purchaseMeta}>{purchase.date}</div>
            <div css={styles.purchaseMeta}>
              {purchase.quantity}개 · {purchase.price.toLocaleString()}원
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const CustomerDetailModal = ({
  isOpen,
  customerId,
  customerName,
  from,
  to,
  onClose,
}: CustomerDetailModalProps) => {
  if (!isOpen) {
    return null
  }

  const queryClient = useQueryClient()
  const dateReady = (from && to) || (!from && !to)
  const title = customerName ? `${customerName} 구매 내역` : '고객 구매 내역'
  const periodLabel = from && to ? `${from} ~ ${to}` : '전체 기간'
  const resetKey = `${customerId ?? 0}-${from ?? ''}-${to ?? ''}`
  const handleRetry = () => {
    if (!customerId) return
    queryClient.invalidateQueries({
      queryKey: ['customer-purchases', { customerId, from: from ?? '', to: to ?? '' }],
    })
  }

  return (
    <div css={styles.overlay} role="dialog" aria-modal="true">
      <div css={styles.modal}>
        <div css={styles.header}>
          <div css={styles.titleBlock}>
            <h3>{title}</h3>
            <p>{periodLabel}</p>
          </div>
          <button type="button" css={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div css={styles.body}>
          {!dateReady ? (
            <div css={[styles.statusBox, styles.statusError]}>시작일과 종료일을 모두 선택해 주세요.</div>
          ) : !customerId ? (
            <div css={styles.statusBox}>고객을 선택해 주세요.</div>
          ) : (
            <ErrorBoundary
              resetKey={resetKey}
              fallback={
                <ErrorFallback message="구매 내역을 불러오지 못했습니다." onRetry={handleRetry} />
              }
            >
              <Suspense fallback={<LoadingSpinner label="구매 내역을 불러오는 중입니다..." />}>
                <CustomerPurchasesContent customerId={customerId} from={from} to={to} />
              </Suspense>
            </ErrorBoundary>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerDetailModal
