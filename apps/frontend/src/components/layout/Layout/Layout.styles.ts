import { css } from '@emotion/react'

export const page = css`
  min-height: 100vh;
  padding: 32px clamp(20px, 4vw, 48px) 56px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const header = css`
  padding: 24px 28px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--line);
  box-shadow: 0 24px 60px rgba(25, 25, 25, 0.08);
`

export const grid = css`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`
