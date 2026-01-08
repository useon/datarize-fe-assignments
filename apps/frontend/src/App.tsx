import Layout from './components/layout/Layout'
import Header from './components/layout/Header'

const App = () => {
  return (
    <Layout header={<Header badge="Datarize" title="쇼핑몰 구매 데이터 대시보드" />}>
      <section>
        <h2>가격대별 구매 빈도</h2>
      </section>
      <section>
        <h2>고객 목록</h2>
      </section>
    </Layout>
  )
}

export default App
