import React from 'react'
import { searchMovies } from '../utils/api'
import { Link } from 'react-router-dom'
import { getTrendingMovies } from '../utils/api'

const Main = () => {
  const [movies, setMovies] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [trendingLoading, setTrendingLoading] = React.useState(false)
  const [trendingMovies, setTrendingMovies] = React.useState([])

  React.useEffect(() => {
    if (searchTerm) {
      setIsLoading(true)
      searchMovies(searchTerm).then((data) => {
        setMovies(data.results)
        setIsLoading(false)
      })
    }
  }, [searchTerm])

  React.useEffect(() => {
    setTrendingLoading(true)
    getTrendingMovies().then((data) => {
      setTrendingMovies(data.results)
      setIsLoading(false)
    })
  }, [])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  console.log(movies)

  return (
    <main className="p-8">
      <div className="main-content max-w-[1378px] mx-auto  relative">
        <div className="main-input-container flex items-center justify-center absolute w-full -top-[55px] z-10">
          <input
            name="search"
            onChange={handleChange}
            value={searchTerm}
            className="main-search w-1/2  h-12 pl-4 bg-[#1d1d1d] rounded-full
             focus:outline-none focus:border-gray-500 max-md:w-full
            "
            type="search"
            placeholder="Search for a movie, tv show, person..."
          />
        </div>

        <div className="trending-videos">
          <div className="trending-videos-header flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-8">Trending Movies</h2>
            <Link to="/movies"> See All</Link>
          </div>
          {!searchTerm && (
            <div className="trending-videos-content grid grid-cols-5 max-[1080px]:grid-cols-3 max-[580px]:grid-cols-2 max-[425px]:grid-cols-1  gap-4">
              {trendingMovies.map((movie) => {
                return (
                  <div key={movie.id} className="trending-video">
                    <Link to={`/movies/${movie.id}`}>
                      <img
                        className="w-full h-[300px] object-cover rounded-lg"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </Link>
                    <div className="trending-video-info">
                      <h3 className="text-lg font-bold">{movie.title}</h3>
                      <p className="text-sm">{movie.release_date}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          {searchTerm && (
            <div className="trending-videos-content grid grid-cols-5 max-[1080px]:grid-cols-3 max-[580px]:grid-cols-2 max-[425px]:grid-cols-1 gap-4">
              {movies.map((movie) => {
                return (
                  (movie.poster_path || movie.backdrop_path) && (
                    <div key={movie.id} className="trending-video">
                      <Link to={`/movies/${movie.id}`}>
                        <img
                          className="w-full h-[300px] object-cover rounded-lg"
                          src={`https://image.tmdb.org/t/p/w500${
                            movie.poster_path === null
                              ? movie.backdrop_path
                              : movie.poster_path
                          }`}
                          alt={movie.title}
                        />
                      </Link>
                      <div className="trending-video-info">
                        <h3 className="text-lg font-bold">{movie.title}</h3>
                        <p className="text-sm">{movie.release_date}</p>
                      </div>
                    </div>
                  )
                )
              })}
            </div>
          )}

          {searchTerm && movies.length === 0 && (
            <div className="flex justify-center items-center h-[300px]">
              <h2 className="text-2xl font-bold">No results found!😣</h2>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export { Main }
