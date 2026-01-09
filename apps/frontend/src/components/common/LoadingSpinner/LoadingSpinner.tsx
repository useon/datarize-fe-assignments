import * as styles from './LoadingSpinner.styles'

type LoadingSpinnerProps = {
  label?: string
}

const LoadingSpinner = ({ label = '불러오는 중...' }: LoadingSpinnerProps) => {
  return (
    <div css={styles.wrapper}>
      <span css={styles.spinner} aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

export default LoadingSpinner
