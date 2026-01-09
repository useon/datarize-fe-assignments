/** @jsxImportSource @emotion/react */
import type { ReactNode } from 'react'
import * as styles from './Header.styles'

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

export default Header
