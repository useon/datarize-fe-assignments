/** @jsxImportSource @emotion/react */
import type { ButtonHTMLAttributes } from 'react'
import * as styles from './Button.styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  return <button css={[styles.base, styles[variant]]} {...props} />
}

export default Button
