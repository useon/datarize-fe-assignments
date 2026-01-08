/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import type { ReactNode } from 'react'

type HeaderProps = {
  badge: string
  title: string
  description?: string
  right?: ReactNode
}

const Header = ({ badge, title, description, right }: HeaderProps) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.brand}>
        <span css={styles.badge}>{badge}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div>{right}</div>
    </div>
  )
}

const styles = {
  wrapper: css`
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: center;
    justify-content: space-between;
  `,
  brand: css`
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
  `,
  badge: css`
    align-self: flex-start;
    padding: 6px 12px;
    border-radius: 999px;
    background: var(--brand);
    color: #111;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  `,
}

export default Header
