import { css } from '@emotion/react'

export const overlay = css`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 999;
`

export const modal = css`
  width: min(720px, 100%);
  background: #fff;
  border-radius: 20px;
  border: 1px solid var(--line);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.2);
  display: flex;
  flex-direction: column;
  max-height: 80vh;
`

export const header = css`
  padding: 18px 20px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: relative;

  h3 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 4px 0 0;
    color: var(--muted);
    font-size: 12px;
  }
`

export const titleBlock = css`
  flex: 1;
  text-align: center;
`

export const closeButton = css`
  border: none;
  background: transparent;
  border-radius: 8px;
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  right: 16px;
  top: 16px;

  &:hover {
    background: rgba(15, 23, 42, 0.08);
  }
`

export const body = css`
  padding: 16px 20px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const purchaseItem = css`
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border-radius: 14px;
  background: #f8f9fb;

  img {
    width: 72px;
    height: 72px;
    border-radius: 12px;
    object-fit: cover;
  }
`

export const purchaseTitle = css`
  font-weight: 600;
`

export const purchaseMeta = css`
  font-size: 12px;
  color: var(--muted);
`

export const statusBox = css`
  padding: 14px;
  border-radius: 12px;
  font-size: 13px;
  background: #f7f8fa;
  color: var(--muted);
`

export const statusError = css`
  background: rgba(255, 210, 210, 0.45);
  color: #7a1f1f;
`
