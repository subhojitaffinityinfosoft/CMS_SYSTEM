import React from 'react'
import ReactDOM from 'react-dom/client'
import ProviderDashboard from './cms/pages/ProviderDashboard'
import "shared-ui/index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="p-8">
      <ProviderDashboard />
    </div>
  </React.StrictMode>
)
