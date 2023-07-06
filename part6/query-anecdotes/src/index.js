import React from 'react'
import ReactDOM from 'react-dom/client'
import { NotificationProvider } from './NotificationContext'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </QueryClientProvider >
)