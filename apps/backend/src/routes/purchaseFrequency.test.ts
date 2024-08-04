import request from 'supertest'
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import purchaseFrequencyRoutes from './purchaseFrequency'
import path from 'path'
import serve from 'koa-static'

const app = new Koa()
const router = new Router()

const staticDirPath = path.join(__dirname, '../../assets')

router.use(purchaseFrequencyRoutes.routes()).use(purchaseFrequencyRoutes.allowedMethods())
app.use(serve(staticDirPath))
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())

describe('구매 빈도 API', () => {
  describe('GET /api/purchase-frequency', () => {
    it('200 OK와 가격 빈도 배열을 반환해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/purchase-frequency')
      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })

    it('10개의 가격 범위를 가져야 합니다', async () => {
      const response = await request(app.callback()).get('/api/purchase-frequency')
      expect(response.body).toHaveLength(10)
    })

    it('"100001 - Infinity" 범위를 포함해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/purchase-frequency')
      const lastRange = response.body[response.body.length - 1]
      expect(lastRange.range).toBe('100001 - Infinity')
    })

    it('"from"만 제공된 경우 400을 반환해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/purchase-frequency?from=2025-10-01')
      expect(response.status).toBe(400)
    })
    
    it('"to"만 제공된 경우 400을 반환해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/purchase-frequency?to=2025-10-01')
      expect(response.status).toBe(400)
    })
    
    it('잘못된 날짜 형식에 대해 400을 반환해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/purchase-frequency?from=invalid-date&to=2025-10-01')
      expect(response.status).toBe(400)
    })

    it('"from" 날짜가 "to" 날짜보다 늦으면 400을 반환해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/purchase-frequency?from=2025-10-02&to=2025-10-01')
      expect(response.status).toBe(400)
    })

    it('날짜 범위로 필터링해야 합니다', async () => {
        const response = await request(app.callback()).get('/api/purchase-frequency?from=2025-10-01&to=2025-10-01')
        expect(response.status).toBe(200)
        // 2025-10-01에는 구매 내역이 있으므로 전체 카운트가 0보다 커야 합니다.
        const totalCount = response.body.reduce((acc: number, range: any) => acc + range.count, 0)
        expect(totalCount).toBeGreaterThan(0)
    });

    it('구매 내역이 없는 날짜 범위에 대해 빈도수가 0이어야 합니다', async () => {
      const response = await request(app.callback()).get('/api/purchase-frequency?from=2000-01-01&to=2000-01-02')
      expect(response.status).toBe(200)
      response.body.forEach((range: any) => {
        expect(range.count).toBe(0)
      })
    })
  })

  describe('GET /api/purchases', () => {
    it('200 OK와 구매 내역 배열을 반환해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/purchases')
      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })

    it('올바른 속성을 가진 구매 내역을 반환해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/purchases')
      if (response.body.length > 0) {
        const purchase = response.body[0]
        expect(purchase).toHaveProperty('date')
        expect(purchase).toHaveProperty('customerName')
        expect(purchase).toHaveProperty('productName')
        expect(purchase).toHaveProperty('price')
        expect(purchase).toHaveProperty('quantity')
      }
    })
    
    it('잘못된 날짜 형식에 대해 400을 반환해야 합니다', async () => {
      const response = await request(app.callback()).get('/api/purchases?from=invalid-date&to=2025-10-01')
      expect(response.status).toBe(400)
    })

    it('날짜 범위로 필터링해야 합니다', async () => {
        const from = '2025-10-01';
        const to = '2025-10-02';
        const response = await request(app.callback()).get(`/api/purchases?from=${from}&to=${to}`)
        expect(response.status).toBe(200)
        response.body.forEach((purchase: any) => {
            const purchaseDate = new Date(purchase.date);
            const fromDate = new Date(from);
            const toDate = new Date(to);
            fromDate.setHours(0,0,0,0);
            toDate.setHours(23,59,59,999);
            expect(purchaseDate >= fromDate).toBe(true);
            expect(purchaseDate <= toDate).toBe(true);
        });
    });
  })
})
