export type PurchaseFrequency = {
  range: string
  count: number
}

export type PurchaseRow = {
  date: string
  customerName: string
  productName: string
  price: number
  quantity: number
}

export type Customer = {
  id: number
  name: string
  count: number
  totalAmount: number
}

export type CustomersResponse = {
  data: Customer[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type CustomerPurchase = {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
}
