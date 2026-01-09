import { useState } from 'react'

type UseCustomerPaginationOptions = {
  initialPage?: number
}

const useCustomerPagination = ({ initialPage = 1 }: UseCustomerPaginationOptions = {}) => {
  const [page, setPage] = useState(initialPage)

  const resetPage = () => setPage(1)
  const handlePrevPage = () => setPage((prev) => Math.max(1, prev - 1))
  const handleNextPage = (totalPages: number) => setPage((prev) => Math.min(totalPages, prev + 1))

  return {
    page,
    resetPage,
    handlePrevPage,
    handleNextPage,
  }
}

export default useCustomerPagination
