import { useState } from 'react'
import Layout from './components/layout/Layout'
import Header from './components/layout/Header'
import DateRangeControl from './components/layout/DateRangeControl'
import PurchaseFrequencySection from './components/purchase/PurchaseFrequencySection'
import { normalizeDateRange } from './utils/dateRange'

const App = () => {
  const [from, setFrom] = useState('2025-10-01')
  const [to, setTo] = useState('2025-12-31')
  const normalized = normalizeDateRange(from, to)

  return (
    <Layout
      header={
        <Header
          badge="Datarize"
          title="쇼핑몰 구매 데이터 대시보드"
          right={<DateRangeControl from={from} to={to} onFromChange={setFrom} onToChange={setTo} />}
        />
      }
    >
      <PurchaseFrequencySection from={normalized.from} to={normalized.to} />
    </Layout>
  )
}

export default App
