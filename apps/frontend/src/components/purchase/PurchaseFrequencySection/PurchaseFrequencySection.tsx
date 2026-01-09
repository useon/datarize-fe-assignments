import { Suspense } from 'react'
import usePurchaseFrequency from '../../../hooks/usePurchaseFrequency'
import usePurchaseCsv from '../../../hooks/usePurchaseCsv'
import type { PurchaseFrequency } from '../../../types'
import Button from '../../common/Button/Button'
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import * as styles from './PurchaseFrequencySection.styles'

type PurchaseFrequencySectionProps = {
  from?: string
  to?: string
}

const formatRangeLabel = (range: string) => {
  const [minRaw, maxRaw] = range.split(' - ')
  const min = Number(minRaw)
  const max = maxRaw === 'Infinity' ? null : Number(maxRaw)

  if (!Number.isFinite(min)) {
    return range
  }

  if (max === null) {
    const minLabel = Math.floor((min - 1) / 10000)
    return `${minLabel}만원 이상`
  }

  if (min === 0) {
    const maxLabel = Math.floor(max / 10000)
    return `${maxLabel}만원 이하`
  }

  const minLabel = Math.floor(min / 10000)
  const maxLabel = Math.floor(max / 10000)
  return `${minLabel}만원 - ${maxLabel}만원`
}

const PurchaseFrequencyContent = ({ from, to }: PurchaseFrequencySectionProps) => {
  const { data } = usePurchaseFrequency({ from, to })

  if (!data || data.length === 0) {
    return <div css={styles.statusBox}>해당 기간에 데이터가 없습니다.</div>
  }

  return (
    <div css={styles.tableWrapper}>
      <table css={styles.table}>
        <thead>
          <tr>
            <th>가격대</th>
            <th>구매 빈도</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: PurchaseFrequency) => (
            <tr key={item.range}>
              <td>{formatRangeLabel(item.range)}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const PurchaseFrequencySection = ({ from, to }: PurchaseFrequencySectionProps) => {
  const { download, state, error } = usePurchaseCsv({ from, to })
  const dateReady = (from && to) || (!from && !to)
  const resetKey = `${from ?? ''}-${to ?? ''}`

  return (
    <div css={styles.section}>
      <div css={styles.titleRow}>
        <div>
          <h2>가격대별 구매 빈도</h2>
          <p>가격 구간별 구매 횟수를 확인할 수 있습니다.</p>
        </div>
        <Button type="button" onClick={download} disabled={state === 'loading'}>
          {state === 'loading' ? 'CSV 준비 중...' : 'CSV 다운로드'}
        </Button>
      </div>

      {state === 'error' && error && <div css={[styles.statusBox, styles.statusError]}>{error}</div>}

      {!dateReady ? (
        <div css={[styles.statusBox, styles.statusError]}>시작일과 종료일을 모두 선택해 주세요.</div>
      ) : (
        <ErrorBoundary
          resetKey={resetKey}
          fallback={<div css={[styles.statusBox, styles.statusError]}>데이터를 불러오지 못했습니다.</div>}
        >
          <Suspense fallback={<LoadingSpinner label="구매 빈도 데이터를 불러오는 중입니다..." />}>
            <PurchaseFrequencyContent from={from} to={to} />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  )
}

export default PurchaseFrequencySection
