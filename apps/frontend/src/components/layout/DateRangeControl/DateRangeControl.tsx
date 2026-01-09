import * as styles from './DateRangeControl.styles'

type DateRangeControlProps = {
  from: string
  to: string
  onFromChange: (value: string) => void
  onToChange: (value: string) => void
}

const DateRangeControl = ({ from, to, onFromChange, onToChange }: DateRangeControlProps) => {
  const label = from && to ? `${from} ~ ${to}` : '전체 기간'

  return (
    <div css={styles.controls}>
      <div css={styles.controlGroup}>
        <label htmlFor="from-date">Start</label>
        <input
          id="from-date"
          type="date"
          value={from}
          onChange={(event) => onFromChange(event.target.value)}
        />
      </div>
      <div css={styles.controlGroup}>
        <label htmlFor="to-date">End</label>
        <input
          id="to-date"
          type="date"
          value={to}
          onChange={(event) => onToChange(event.target.value)}
        />
      </div>
      <span css={styles.rangeHint}>{label}</span>
    </div>
  )
}

export default DateRangeControl
