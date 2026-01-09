/** @jsxImportSource @emotion/react */
import useCustomerPurchases from '../../../hooks/useCustomerPurchases'
import type { CustomerPurchase } from '../../../types'
import * as styles from './CustomerDetailModal.styles'

type CustomerDetailModalProps = {
  isOpen: boolean
  customerId?: number
  customerName?: string
  from?: string
  to?: string
  onClose: () => void
}

const CustomerDetailModal = ({
  isOpen,
  customerId,
  customerName,
  from,
  to,
  onClose,
}: CustomerDetailModalProps) => {
  const { data, isLoading, isError, dateReady, enabled } = useCustomerPurchases({
    customerId,
    from,
    to,
  })

  if (!isOpen) {
    return null
  }

  const title = customerName ? `${customerName} 구매 내역` : '고객 구매 내역'
  const periodLabel = from && to ? `${from} ~ ${to}` : '전체 기간'

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
          {!dateReady && (
            <div css={[styles.statusBox, styles.statusError]}>시작일과 종료일을 모두 선택해 주세요.</div>
          )}
          {enabled && isLoading && <div css={styles.statusBox}>구매 내역을 불러오는 중입니다...</div>}
          {enabled && isError && (
            <div css={[styles.statusBox, styles.statusError]}>구매 내역을 불러오지 못했습니다.</div>
          )}
          {enabled && data && data.length === 0 && (
            <div css={styles.statusBox}>해당 기간에 구매 내역이 없습니다.</div>
          )}
          {enabled && data && data.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerDetailModal
