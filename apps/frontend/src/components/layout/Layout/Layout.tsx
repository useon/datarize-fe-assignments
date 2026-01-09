import type { ReactNode } from 'react'
import * as styles from './Layout.styles'

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

export default Layout
