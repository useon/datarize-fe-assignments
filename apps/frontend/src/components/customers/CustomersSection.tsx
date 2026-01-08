/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import useCustomers from '../../hooks/useCustomers'
import CustomerDetailModal from './CustomerDetailModal'
import * as styles from './CustomersSection.styles'

type CustomersSectionProps = {
  from?: string
  to?: string
}

const CustomersSection = ({ from, to }: CustomersSectionProps) => {
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | ''>('')
  const [name, setName] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [selectedCustomer, setSelectedCustomer] = useState<{ id: number; name: string } | null>(null)
  const handleSortChange = (value: 'asc' | 'desc' | '') => setSortBy(value)
  const handleNameChange = (value: string) => setName(value)
  const handleLimitChange = (value: number) => {
    setLimit(value)
    setPage(1)
  }
  const handlePrevPage = () => setPage((prev) => Math.max(1, prev - 1))
  const handleNextPage = (totalPages: number) => setPage((prev) => Math.min(totalPages, prev + 1))
  const { data, isLoading, isError, dateReady } = useCustomers({
    from,
    to,
    sortBy: sortBy || undefined,
    name: name.trim() || undefined,
    page,
    limit,
  })
  const totalPages = data?.pagination.totalPages ?? 1
  const handleRowClick = (id: number, customerName: string) => {
    setSelectedCustomer({ id, name: customerName })
  }
  const handleCloseModal = () => setSelectedCustomer(null)

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
      ) : isLoading ? (
        <div css={styles.statusBox}>고객 데이터를 불러오는 중입니다...</div>
      ) : isError ? (
        <div css={[styles.statusBox, styles.statusError]}>데이터를 불러오지 못했습니다.</div>
      ) : !data || data.data.length === 0 ? (
        <div css={styles.statusBox}>해당 기간에 고객이 없습니다.</div>
      ) : (
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
              <tr key={customer.id} onClick={() => handleRowClick(customer.id, customer.name)}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.count}</td>
                <td>{customer.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div css={styles.pagination}>
        <button type="button" onClick={handlePrevPage} disabled={page <= 1}>
          이전
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button type="button" onClick={() => handleNextPage(totalPages)} disabled={page >= totalPages}>
          다음
        </button>
      </div>

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
