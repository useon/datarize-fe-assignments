/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import type { ReactNode } from 'react'

type LayoutProps = {
  header: ReactNode
  children: ReactNode
}

const Layout = ({ header, children }: LayoutProps) => {
  return (
    <div css={styles.page}>
      <header css={styles.header}>{header}</header>
      <main css={styles.grid}>{children}</main>
    </div>
  )
}

const styles = {
  page: css`
    min-height: 100vh;
    padding: 32px clamp(20px, 4vw, 48px) 56px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  header: css`
    padding: 24px 28px;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid var(--line);
    box-shadow: 0 24px 60px rgba(25, 25, 25, 0.08);
  `,
  grid: css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 20px;

    @media (max-width: 1100px) {
      grid-template-columns: 1fr;
    }
  `,
}

export default Layout
