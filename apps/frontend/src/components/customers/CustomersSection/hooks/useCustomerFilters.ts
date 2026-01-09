import { useState } from 'react'

type SortBy = '' | 'asc' | 'desc'

type UseCustomerFiltersOptions = {
  initialLimit?: number
}

const useCustomerFilters = ({ initialLimit = 20 }: UseCustomerFiltersOptions = {}) => {
  const [sortBy, setSortBy] = useState<SortBy>('')
  const [name, setName] = useState('')
  const [limit, setLimit] = useState(initialLimit)

  const handleSortChange = (value: SortBy) => setSortBy(value)
  const handleNameChange = (value: string) => setName(value)
  const handleLimitChange = (value: number) => setLimit(value)

  return {
    sortBy,
    name,
    limit,
    handleSortChange,
    handleNameChange,
    handleLimitChange,
  }
}

export default useCustomerFilters
