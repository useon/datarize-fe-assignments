import { Suspense, useEffect } from 'react'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import useCustomers from '../../../hooks/useCustomers'
import CustomerDetailModal from '../CustomerDetailModal/CustomerDetailModal'
import useCustomerFilters from './hooks/useCustomerFilters'
import useCustomerPagination from './hooks/useCustomerPagination'
import useCustomerSelection from './hooks/useCustomerSelection'
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary'
import ErrorFallback from '../../common/ErrorFallback/ErrorFallback'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import { isDateRangeReady } from '../../../utils/dateRangeReady'
import * as styles from './CustomersSection.styles'

type CustomersSectionProps = {
  from?: string
  to?: string
}

type CustomersContentProps = {
  from?: string
  to?: string
  page: number
  limit: number
  sortBy: '' | 'asc' | 'desc'
  name: string
  onRowClick: (id: number, name: string) => void
  onPrev: () => void
  onNext: (totalPages: number) => void
}

const CustomersContent = ({
  from,
  to,
  page,
  limit,
  sortBy,
  name,
  onRowClick,
  onPrev,
  onNext,
}: CustomersContentProps) => {
  const { data } = useCustomers({
    from,
    to,
    sortBy: sortBy || undefined,
    name: name.trim() || undefined,
    page,
    limit,
  })
  const totalPages = data?.pagination.totalPages ?? 1

  if (!data || data.data.length === 0) {
    return (
      <>
        <div css={styles.statusBox}>해당 기간에 고객이 없습니다.</div>
        <div css={styles.pagination}>
          <button type="button" onClick={onPrev} disabled={page <= 1}>
            이전
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button type="button" onClick={() => onNext(totalPages)} disabled={page >= totalPages}>
            다음
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div css={styles.tableWrapper}>
        <table css={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>총 구매 횟수</th>
              <th>총 구매 금액</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((customer) => (
              <tr key={customer.id} onClick={() => onRowClick(customer.id, customer.name)}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.count}</td>
                <td>{customer.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div css={styles.pagination}>
        <button type="button" onClick={onPrev} disabled={page <= 1}>
          이전
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button type="button" onClick={() => onNext(totalPages)} disabled={page >= totalPages}>
          다음
        </button>
      </div>
    </>
  )
}

const CustomersSection = ({ from, to }: CustomersSectionProps) => {
  const { sortBy, name, limit, handleSortChange, handleNameChange, handleLimitChange } =
    useCustomerFilters()
  const { page, resetPage, handlePrevPage, handleNextPage } = useCustomerPagination()
  const { selectedCustomer, handleRowClick, handleCloseModal } = useCustomerSelection()
  const { reset } = useQueryErrorResetBoundary()
  const dateReady = isDateRangeReady(from, to)
  const resetKey = `${from ?? ''}-${to ?? ''}-${page}-${limit}-${sortBy}-${name}`

  useEffect(() => {
    resetPage()
  }, [sortBy, name, limit, resetPage])

  return (
    <div css={styles.section}>
      <div css={styles.titleRow}>
        <div>
          <h2>고객 목록</h2>
          <p>선택된 기간에 맞는 고객 목록입니다.</p>
        </div>
        <div css={styles.controls}>
          <div css={styles.searchBox}>
            <label htmlFor="customer-name">이름 검색</label>
            <input
              id="customer-name"
              type="search"
              value={name}
              placeholder="이름을 입력하세요"
              onChange={(event) => handleNameChange(event.target.value)}
            />
          </div>
          <div css={styles.limitBox}>
            <label htmlFor="limit">표시 개수</label>
            <select
              id="limit"
              value={limit}
              onChange={(event) => handleLimitChange(Number(event.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
          <div css={styles.sortBox}>
            <label htmlFor="sortBy">정렬</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(event) => handleSortChange(event.target.value as 'asc' | 'desc' | '')}
            >
              <option value="">기본 (ID 오름차순)</option>
              <option value="desc">구매 금액 높은 순</option>
              <option value="asc">구매 금액 낮은 순</option>
            </select>
          </div>
        </div>
      </div>

      {!dateReady ? (
        <div css={[styles.statusBox, styles.statusError]}>시작일과 종료일을 모두 선택해 주세요.</div>
      ) : (
        <ErrorBoundary
          resetKey={resetKey}
          onReset={reset}
          fallback={<ErrorFallback message="고객 목록을 불러오지 못했습니다." onRetry={reset} />}
        >
          <Suspense fallback={<LoadingSpinner label="고객 데이터를 불러오는 중입니다..." />}>
            <CustomersContent
              from={from}
              to={to}
              page={page}
              limit={limit}
              sortBy={sortBy}
              name={name}
              onRowClick={handleRowClick}
              onPrev={handlePrevPage}
              onNext={handleNextPage}
            />
          </Suspense>
        </ErrorBoundary>
      )}

      <CustomerDetailModal
        isOpen={Boolean(selectedCustomer)}
        customerId={selectedCustomer?.id}
        customerName={selectedCustomer?.name}
        from={from}
        to={to}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default CustomersSection
