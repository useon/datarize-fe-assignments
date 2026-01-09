import { useState } from 'react'

type SelectedCustomer = {
  id: number
  name: string
} | null

const useCustomerSelection = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<SelectedCustomer>(null)

  const handleRowClick = (id: number, customerName: string) => {
    setSelectedCustomer({ id, name: customerName })
  }

  const handleCloseModal = () => setSelectedCustomer(null)

  return {
    selectedCustomer,
    handleRowClick,
    handleCloseModal,
  }
}

export default useCustomerSelection
