import { describe, expect, it } from 'vitest'
import { createCsvContent } from './csv'

describe('createCsvContent', () => {
  it('유저가 CSV를 다운로드하면 헤더와 행이 포함된 파일을 받는다', () => {
    const csv = createCsvContent(['a', 'b'], [
      ['1', '2'],
      ['3', '4'],
    ])
    expect(csv).toBe('a,b\n1,2\n3,4')
  })

  it('고객 이름에 쉼표가 포함돼도 CSV 열이 깨지지 않는다', () => {
    const csv = createCsvContent(['name'], [['김, "테스트"']])
    expect(csv).toBe('name\n"김, ""테스트"""')
  })
})
