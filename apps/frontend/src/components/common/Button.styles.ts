import { css } from '@emotion/react'

export const base = css`
  padding: 10px 16px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
  }
`

export const primary = css`
  background: var(--brand-strong);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(25, 25, 25, 0.12);
  }
`

export const secondary = css`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: #fff;

  &:hover:not(:disabled) {
    background: rgba(247, 255, 145, 0.18);
  }
`
