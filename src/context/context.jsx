import React, { useState, useContext, createContext, useEffect } from 'react'
import { getMovies, loadMoreMovies } from '../utils/api'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMovies().then((data) => {
      setAllMovies(data.results)
      setLoading(false)
    })
  }, [])

  const value = {
    allMovies,
    loading,
  }

  return <AppContext.Provider children={children} value={value} />
}

export const useAppContext = () => useContext(AppContext)
export { AppProvider }
