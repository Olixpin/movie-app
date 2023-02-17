const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = `https://api.themoviedb.org/3`
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`

const getMovies = async () => {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export { getMovies }
