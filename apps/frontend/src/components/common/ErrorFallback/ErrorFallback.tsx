import Button from '../Button/Button'
import * as styles from './ErrorFallback.styles'

type ErrorFallbackProps = {
  message: string
  onRetry?: () => void
}

const ErrorFallback = ({ message, onRetry }: ErrorFallbackProps) => {
  return (
    <div css={styles.wrapper}>
      <span>{message}</span>
      {onRetry && (
        <div css={styles.actions}>
          <Button type="button" variant="secondary" onClick={onRetry}>
            다시 시도
          </Button>
        </div>
      )}
    </div>
  )
}

export default ErrorFallback
