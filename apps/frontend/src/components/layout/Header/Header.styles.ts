import { css } from '@emotion/react'

export const wrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
`

export const brand = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 520px;

  h1 {
    margin: 0;
    font-size: clamp(24px, 3vw, 32px);
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
    color: var(--muted);
    font-size: 14px;
  }
`

export const badge = css`
  align-self: flex-start;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--brand);
  color: #111;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`
