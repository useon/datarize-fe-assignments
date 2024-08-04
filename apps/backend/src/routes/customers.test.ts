import request from 'supertest'
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import customerRoutes from './customers'
import { getProducts } from '../data'

const app = new Koa()
const router = new Router()

router.use('/api/customers', customerRoutes.routes()).use(customerRoutes.allowedMethods())
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())

describe('고객 API', () => {
  describe('GET /api/customers', () => {
    it('200 OK와 페이지네이션된 응답을 반환해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/customers')
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('data')
      expect(response.body).toHaveProperty('pagination')
      expect(Array.isArray(response.body.data)).toBe(true)
    })

    it('각 고객에 대해 숫자 형태의 구매 횟수를 가져야 합니다', async () => {
      const response = await request(app.callback()).get('/api/customers')
      if (response.body.data.length > 0) {
        expect(typeof response.body.data[0].count).toBe('number')
      }
    })

    it('totalAmount 기준으로 내림차순 정렬해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/customers?sortBy=desc')
      expect(response.status).toBe(200)
      const customers = response.body.data
      if (customers.length > 1) {
        expect(customers[0].totalAmount).toBeGreaterThanOrEqual(customers[1].totalAmount)
      }
    })

    it('totalAmount 기준으로 오름차순 정렬해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/customers?sortBy=asc')
      expect(response.status).toBe(200)
      const customers = response.body.data
      if (customers.length > 1) {
        expect(customers[0].totalAmount).toBeLessThanOrEqual(customers[1].totalAmount)
      }
    })

    it('잘못된 sortBy 파라미터에 대해 400을 반환해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/customers?sortBy=foo')
      expect(response.status).toBe(400)
    })

    it('이름으로 필터링해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/customers?name=황지민')
      expect(response.status).toBe(200)
      response.body.data.forEach((customer: any) => {
        expect(customer.name).toContain('황지민')
      })
    })

    it('페이지네이션이 올바르게 작동해야 합니다 (page 2, limit 5)', async () => {
      const response = await request(app.callback()).get('/api/customers?page=2&limit=5')
      expect(response.status).toBe(200)
      expect(response.body.pagination.page).toBe(2)
      expect(response.body.pagination.limit).toBe(5)
      expect(response.body.data.length).toBeLessThanOrEqual(5)
    })

    it('잘못된 page 파라미터에 대해 400을 반환해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/customers?page=invalid')
      expect(response.status).toBe(400)
    })

    it('잘못된 limit 파라미터에 대해 400을 반환해야 합니다 (100 초과)', async () => {
      const response = await request(app.callback()).get('/api/customers?limit=101')
      expect(response.status).toBe(400)
    })

    it('날짜 범위로 고객 데이터를 필터링해야 합니다', async () => {
      const fullResponse = await request(app.callback()).get('/api/customers')
      const filteredResponse = await request(app.callback()).get('/api/customers?from=2025-10-01&to=2025-10-31')
      
      expect(filteredResponse.status).toBe(200)
      
      // 전체 기간의 총 구매액이 특정 기간의 총 구매액보다 크거나 같아야 합니다.
      const fullTotal = fullResponse.body.data.reduce((acc: number, c: any) => acc + c.totalAmount, 0)
      const filteredTotal = filteredResponse.body.data.reduce((acc: number, c: any) => acc + c.totalAmount, 0)
      
      expect(fullTotal).toBeGreaterThanOrEqual(filteredTotal)
      expect(filteredTotal).toBeGreaterThan(0) // 10월에는 구매 내역이 있어야 합니다.
    })
  })

  describe('GET /api/customers/:id/purchases', () => {
    it('유효한 고객 ID에 대해 200 OK를 반환해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/customers/1/purchases')
      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })

    it('존재하지 않는 고객 ID에 대해 404를 반환해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/customers/9999/purchases')
      expect(response.status).toBe(404)
    })

    it('숫자가 아닌 고객 ID에 대해 400을 반환해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/customers/invalid/purchases')
      expect(response.status).toBe(400)
    })

    it('단가가 포함된 구매 상세 내역을 반환해야 합니다', async () => {
      const products = await getProducts()
      const response = await request(app.callback()).get('/api/customers/1/purchases')
      
      if (response.body.length > 0) {
        const purchase = response.body[0]
        const product = products.find(p => p.name === purchase.product)
        
        expect(purchase.price).toBe(product?.price)
      }
    })

    it('날짜 범위로 특정 고객의 구매 내역을 필터링해야 합니다', async () => {
      const from = '2025-11-01'
      const to = '2025-11-30'
      const response = await request(app.callback()).get(`/api/customers/1/purchases?from=${from}&to=${to}`)
      expect(response.status).toBe(200)

      response.body.forEach((purchase: any) => {
        const purchaseDate = new Date(purchase.date)
        const fromDate = new Date(from)
        const toDate = new Date(to)
        fromDate.setHours(0,0,0,0)
        toDate.setHours(23,59,59,999)
        expect(purchaseDate >= fromDate).toBe(true)
        expect(purchaseDate <= toDate).toBe(true)
        expect(purchaseDate.getMonth()).toBe(10) // 0-indexed month for November
      })
    })
  })
})
