import React from 'react'
import { useRouteError, useNavigate } from 'react-router-dom'

const Error = () => {
  const error = useRouteError() || useErrorBoundaryError()
  const navigate = useNavigate()

  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => navigate('/')}>
        Click here to reload the app
      </button>
    </div>
  )
}

export { Error }
