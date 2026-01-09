import { describe, expect, it } from 'vitest'
import formatRangeLabel from './formatRangeLabel'

describe('formatRangeLabel', () => {
  it('유저가 2만원 이하 구간을 보면 "2만원 이하"로 보인다', () => {
    expect(formatRangeLabel('0 - 20000')).toBe('2만원 이하')
  })

  it('유저가 중간 구간을 보면 "만원 - 만원" 형태로 보인다', () => {
    expect(formatRangeLabel('20001 - 30000')).toBe('2만원 - 3만원')
    expect(formatRangeLabel('40001 - 50000')).toBe('4만원 - 5만원')
  })

  it('유저가 10만원 이상 구간을 보면 "10만원 이상"으로 보인다', () => {
    expect(formatRangeLabel('100001 - Infinity')).toBe('10만원 이상')
  })

  it('유저가 이상한 범위를 받으면 원본 문자열을 그대로 본다', () => {
    expect(formatRangeLabel('invalid')).toBe('invalid')
  })
})
