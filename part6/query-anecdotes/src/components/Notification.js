import React, { useEffect } from 'react'
import { useNotificationContext } from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [message, dispatch] = useNotificationContext()

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: 'SET_NOTIFICATION', payload: null });
      }, 5000)

      return () => clearTimeout(timeoutId)
    }
  }, [message, dispatch])

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
