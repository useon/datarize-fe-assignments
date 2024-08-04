import Router from 'koa-router'
import { getPurchases, getProducts, getCustomers } from '../data'

const router = new Router()

router.get('/api/purchases', async (ctx) => {
  try {
    const { from, to } = ctx.query

    if ((from && !to) || (!from && to)) {
      ctx.status = 400
      ctx.body = { error: 'Both from and to must be provided' }
      return
    }

    let fromDate: Date
    let toDate: Date
    if (from && to) {
      if (typeof from !== 'string' || typeof to !== 'string') {
        ctx.status = 400
        ctx.body = { error: 'Invalid date format. Dates must be in ISO 8601 format' }
        return
      }

      if (isNaN(Date.parse(from)) || isNaN(Date.parse(to))) {
        ctx.status = 400
        ctx.body = { error: 'Invalid date format. Dates must be in ISO 8601 format' }
        return
      }

      fromDate = new Date(from)
      toDate = new Date(to)

      if (fromDate > toDate) {
        ctx.status = 400
        ctx.body = { error: 'From date must be before to date' }
        return
      }
    }

    const purchases = await getPurchases()
    const products = await getProducts()
    const customers = await getCustomers()

    const filteredPurchases = purchases
      .filter((purchase) => {
        const purchaseDate = new Date(purchase.date)
        if (fromDate && toDate) {
          // Set hours to 0 to compare dates only
          fromDate.setHours(0, 0, 0, 0)
          toDate.setHours(23, 59, 59, 999)
          return purchaseDate >= fromDate && purchaseDate <= toDate
        }
        return true
      })
      .map((purchase) => {
        const product = products.find((p) => p.id === purchase.productId)
        const customer = customers.find((c) => c.id === purchase.customerId)
        return {
          date: purchase.date,
          customerName: customer ? customer.name : 'Unknown',
          productName: product ? product.name : 'Unknown',
          price: product ? product.price : 0,
          quantity: purchase.quantity,
        }
      })

    ctx.body = filteredPurchases
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: `An error occurred while processing your request. ${error}` }
  }
})

router.get('/api/purchase-frequency', async (ctx) => {
  try {
    const { from, to } = ctx.query

    if ((from && !to) || (!from && to)) {
      ctx.status = 400
      ctx.body = { error: 'Both from and to must be provided' }
      return
    }

    let fromDate: Date
    let toDate: Date
    if (from && to) {
      if (typeof from !== 'string' || typeof to !== 'string') {
        ctx.status = 400
        ctx.body = { error: 'Invalid date format. Dates must be in ISO 8601 format' }
        return
      }

      if (isNaN(Date.parse(from)) || isNaN(Date.parse(to))) {
        ctx.status = 400
        ctx.body = { error: 'Invalid date format. Dates must be in ISO 8601 format' }
        return
      }

      fromDate = new Date(from)
      toDate = new Date(to)

      if (fromDate > toDate) {
        ctx.status = 400
        ctx.body = { error: 'From date must be before to date' }
        return
      }
    }

    const purchases = await getPurchases()
    const products = await getProducts()

    const priceRanges = [
      { min: 0, max: 20000 },
      { min: 20001, max: 30000 },
      { min: 30001, max: 40000 },
      { min: 40001, max: 50000 },
      { min: 50001, max: 60000 },
      { min: 60001, max: 70000 },
      { min: 70001, max: 80000 },
      { min: 80001, max: 90000 },
      { min: 90001, max: 100000 },
      { min: 100001, max: Infinity },
    ]

    const frequency = priceRanges.map((range) => ({
      range: `${range.min} - ${range.max === Infinity ? 'Infinity' : range.max}`,
      count: 0,
    }))

    purchases
      .filter((purchase) => {
        const purchaseDate = new Date(purchase.date)
        if (fromDate && toDate) {
          fromDate.setHours(0, 0, 0, 0)
          toDate.setHours(23, 59, 59, 999)
          return purchaseDate >= fromDate && purchaseDate <= toDate
        }
        return true
      })
      .forEach((purchase) => {
        const product = products.find((p) => p.id === purchase.productId)
        if (product) {
          const productPrice = product.price
          const range = priceRanges.find((r) => productPrice >= r.min && productPrice <= r.max)
          if (range) {
            const rangeIndex = priceRanges.indexOf(range)
            frequency[rangeIndex].count += purchase.quantity
          }
        } else {
          ctx.status = 400
          ctx.body = { error: `Product with ID ${purchase.productId} not found` }
          return
        }
      })

    ctx.body = frequency
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: `An error occurred while processing your request. ${error}` }
  }
})

export default router
