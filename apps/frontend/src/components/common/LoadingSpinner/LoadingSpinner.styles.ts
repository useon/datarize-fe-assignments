import { css } from '@emotion/react'

export const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 24px;
  border-radius: 14px;
  background: #f7f8fa;
  color: var(--muted);
  font-size: 13px;
  min-height: 140px;
  width: 100%;
`

export const spinner = css`
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 3px solid rgba(15, 23, 42, 0.12);
  border-top-color: rgba(15, 23, 42, 0.5);
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
