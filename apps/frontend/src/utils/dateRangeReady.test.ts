import { describe, expect, it } from 'vitest'
import { isDateRangeReady } from './dateRangeReady'

describe('isDateRangeReady', () => {
  it('유저가 시작일과 종료일을 모두 선택하면 유효하다', () => {
    expect(isDateRangeReady('2025-10-01', '2025-10-31')).toBe(true)
  })

  it('유저가 날짜를 아예 선택하지 않아도 전체 기간 조회는 가능하다', () => {
    expect(isDateRangeReady('', '')).toBe(true)
    expect(isDateRangeReady(undefined, undefined)).toBe(true)
  })

  it('유저가 시작일 또는 종료일만 선택하면 조회가 불가능하다', () => {
    expect(isDateRangeReady('2025-10-01', '')).toBe(false)
    expect(isDateRangeReady('', '2025-10-01')).toBe(false)
  })
})
