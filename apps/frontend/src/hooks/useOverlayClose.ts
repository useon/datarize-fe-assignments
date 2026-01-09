import { useCallback } from 'react'

const useOverlayClose = (onClose: () => void) => {
  const handleOverlayClick = useCallback(() => {
    onClose()
  }, [onClose])

  const handleContentClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
  }, [])

  return {
    handleOverlayClick,
    handleContentClick,
  }
}

export default useOverlayClose
