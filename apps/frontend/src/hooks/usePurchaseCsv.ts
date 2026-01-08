import { useState } from 'react'
import { getPurchases } from '../api/purchases'
import { createCsvContent, downloadCsv } from '../utils/csv'
import type { PurchaseRow } from '../types'

type UsePurchaseCsvParams = {
  from?: string
  to?: string
}

type CsvState = 'idle' | 'loading' | 'success' | 'error'

const usePurchaseCsv = ({ from, to }: UsePurchaseCsvParams) => {
  const [state, setState] = useState<CsvState>('idle')
  const [error, setError] = useState<string | null>(null)

  const download = async () => {
    setState('loading')
    setError(null)

    try {
      const purchases = await getPurchases({ from, to })
      const headers = ['date', 'customerName', 'productName', 'price', 'quantity']
      const rows = purchases.map((purchase: PurchaseRow) => [
        purchase.date,
        purchase.customerName,
        purchase.productName,
        purchase.price,
        purchase.quantity,
      ])
      const csv = createCsvContent(headers, rows)
      const filename = `purchases_${from || 'all'}_${to || 'all'}.csv`
      downloadCsv(filename, csv)
      setState('success')
    } catch (fetchError) {
      setState('error')
      setError(fetchError instanceof Error ? fetchError.message : 'CSV 다운로드 실패')
    }
  }

  return {
    download,
    state,
    error,
  }
}

export default usePurchaseCsv
