import { css } from '@emotion/react'

export const controls = css`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
  justify-content: flex-end;
`

export const controlGroup = css`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 12px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  input {
    min-width: 130px;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid var(--line);
    background: #fff;
    font-size: 14px;
  }
`

export const rangeHint = css`
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(247, 255, 145, 0.35);
  font-size: 12px;
  font-weight: 600;
`
