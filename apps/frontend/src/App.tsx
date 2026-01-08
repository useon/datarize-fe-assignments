import Layout from './components/layout/Layout'
import Header from './components/layout/Header'
import PurchaseFrequencySection from './components/purchase/PurchaseFrequencySection'

const App = () => {
  return (
    <Layout header={<Header badge="Datarize" title="쇼핑몰 구매 데이터 대시보드" />}>
      <PurchaseFrequencySection />
    </Layout>
  )
}

export default App
