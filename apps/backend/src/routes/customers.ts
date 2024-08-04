import Router from 'koa-router'
import { getPurchases, getProducts, getCustomers } from '../data'

const router = new Router()

// 고객 목록 API (정렬 및 페이지네이션 포함)
router.get('/', async (ctx) => {
  try {
    const { sortBy, name, page, limit, from, to } = ctx.query
    let purchases = await getPurchases()
    const customers = await getCustomers()
    const products = await getProducts()

    // 날짜 필터링 로직
    if (from && to) {
      if (typeof from !== 'string' || typeof to !== 'string' || isNaN(Date.parse(from)) || isNaN(Date.parse(to))) {
        ctx.status = 400
        ctx.body = { error: 'Invalid date format. Dates must be in ISO 8601 format' }
        return
      }
      const fromDate = new Date(from)
      const toDate = new Date(to)
      fromDate.setHours(0, 0, 0, 0)
      toDate.setHours(23, 59, 59, 999)

      if (fromDate > toDate) {
        ctx.status = 400
        ctx.body = { error: 'From date must be before to date' }
        return
      }
      purchases = purchases.filter(p => {
        const purchaseDate = new Date(p.date)
        return purchaseDate >= fromDate && purchaseDate <= toDate
      })
    }

    // 페이지네이션 파라미터 처리
    const pageNum = page ? Number(page) : 1
    const limitNum = limit ? Number(limit) : 20

    if (isNaN(pageNum) || pageNum < 1) {
      ctx.status = 400
      ctx.body = { error: 'Invalid page parameter. Must be a positive number.' }
      return
    }

    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      ctx.status = 400
      ctx.body = { error: 'Invalid limit parameter. Must be between 1 and 100.' }
      return
    }

    const customerData: { [key: number]: { purchases: any[]; totalAmount: number } } = {}

    purchases.forEach((purchase) => {
      if (!customerData[purchase.customerId]) {
        customerData[purchase.customerId] = { purchases: [], totalAmount: 0 }
      }
      const product = products.find((p) => p.id === purchase.productId)
      if (product) {
        customerData[purchase.customerId].purchases.push(purchase)
        customerData[purchase.customerId].totalAmount += purchase.quantity * product.price
      }
    })

    let topCustomers = Object.keys(customerData).map((id) => {
      const customer = customers.find((c) => c.id === Number(id))
      const customerPurchases = customerData[Number(id)].purchases
      const purchaseDates = new Set(customerPurchases.map((p) => p.date))

      return {
        id: Number(id),
        name: customer ? customer.name : 'Unknown',
        count: purchaseDates.size,
        totalAmount: customerData[Number(id)].totalAmount,
      }
    })

    // 이름 필터링
    if (name) {
      if (typeof name !== 'string') {
        ctx.status = 400
        ctx.body = { error: 'Invalid name type parameter.' }
        return
      }
      topCustomers = topCustomers.filter((customer) =>
        customer.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
      )
    }

    // 정렬
    if (!sortBy) {
      topCustomers.sort((a, b) => a.id - b.id)
    } else if (sortBy === 'asc' || sortBy === 'desc') {
      topCustomers.sort((a, b) => {
        const comparison = b.totalAmount - a.totalAmount
        return sortBy === 'asc' ? -comparison : comparison
      })
    } else {
      ctx.status = 400
      ctx.body = { error: 'Invalid sortBy parameter. Use "asc" or "desc".' }
      return
    }

    // 전체 개수
    const total = topCustomers.length

    // 페이지네이션 적용
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    const paginatedCustomers = topCustomers.slice(startIndex, endIndex)

    // 응답
    ctx.body = {
      data: paginatedCustomers,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: total,
        totalPages: Math.ceil(total / limitNum),
      },
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: 'An error occurred while processing your request.' }
  }
})

// 특정 고객의 구매 내역 API
router.get('/:id/purchases', async (ctx) => {
  try {
    const customerId = Number(ctx.params.id)
    const { from, to } = ctx.query

    if (isNaN(customerId)) {
      ctx.status = 400
      ctx.body = { error: 'Invalid customer ID' }
      return
    }

    const customers = await getCustomers()
    const customerExists = customers.some((customer) => customer.id === customerId)

    if (!customerExists) {
      ctx.status = 404
      ctx.body = { error: 'Customer not found' }
      return
    }

    let purchases = await getPurchases()
    const products = await getProducts()

    // 날짜 필터링 로직
    if (from && to) {
        if (typeof from !== 'string' || typeof to !== 'string' || isNaN(Date.parse(from)) || isNaN(Date.parse(to))) {
          ctx.status = 400
          ctx.body = { error: 'Invalid date format. Dates must be in ISO 8601 format' }
          return
        }
        const fromDate = new Date(from)
        const toDate = new Date(to)
        fromDate.setHours(0, 0, 0, 0)
        toDate.setHours(23, 59, 59, 999)
  
        if (fromDate > toDate) {
          ctx.status = 400
          ctx.body = { error: 'From date must be before to date' }
          return
        }
        purchases = purchases.filter(p => {
          const purchaseDate = new Date(p.date)
          return purchaseDate >= fromDate && purchaseDate <= toDate
        })
      }

    const customerPurchases = purchases.filter((purchase) => purchase.customerId === customerId)

    const purchaseDetails = customerPurchases.map((purchase) => {
      const product = products.find((p) => p.id === purchase.productId)
      return {
        date: purchase.date,
        quantity: purchase.quantity,
        product: product ? product.name : 'Unknown',
        price: product ? product.price : 0,
        imgSrc: product ? product.imgSrc : '',
      }
    })

    ctx.body = purchaseDetails
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: 'An error occurred while processing your request.' }
  }
})

export default router
