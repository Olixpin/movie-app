import React from 'react'

const ScrollToTop = ({ children }) => {
  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  )
}

export { scrollToTop }
