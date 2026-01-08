/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import type { ReactNode } from 'react'

type StatusMessageProps = {
  variant?: 'error' | 'loading' | 'empty'
  children: ReactNode
}

const StatusMessage = ({ variant = 'empty', children }: StatusMessageProps) => {
  return <div css={[styles.base, styles[variant]]}>{children}</div>
}

const styles = {
  base: css`
    margin-top: 12px;
    padding: 14px;
    border-radius: 14px;
    font-size: 13px;
  `,
  error: css`
    background: rgba(255, 210, 210, 0.45);
    color: #7a1f1f;
  `,
  loading: css`
    background: #f4f5f7;
    color: var(--muted);
  `,
  empty: css`
    background: #f7f8fa;
    color: var(--muted);
  `,
}

export default StatusMessage
