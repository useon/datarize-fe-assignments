import { css } from '@emotion/react'

export const section = css`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h2 {
    margin: 0;
    font-size: 20px;
  }

  p {
    margin: 0;
    color: var(--muted);
    font-size: 13px;
  }
`

export const titleRow = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const tableWrapper = css`
  margin-top: 16px;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--line);
  background: #fff;
`

export const table = css`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    padding: 12px 14px;
    text-align: left;
    border-bottom: 1px solid var(--line);
  }

  th {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
    background: #f8f9fb;
  }

  tr:last-of-type td {
    border-bottom: none;
  }
`

export const statusBox = css`
  margin-top: 12px;
  padding: 14px;
  border-radius: 14px;
  font-size: 13px;
  background: #f7f8fa;
  color: var(--muted);
`

export const statusError = css`
  background: rgba(255, 210, 210, 0.45);
  color: #7a1f1f;
`
