import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  loadMoreMovies,
  filterMovies,
  genres,
  filterMoviesByGenre,
  filterMoviesByDate,
} from '../utils/api'
import { scrollToTop } from '../ui/ScrollToTop'

const Movies = () => {
  const [movies, setMovies] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [page, setPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(0)
  const [_genres, _setGenres] = React.useState([])
  const [genreId, setGenreId] = React.useState(0)
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')

  useEffect(() => {
    genres().then((data) => {
      _setGenres(data.genres)
    })
  }, [])

  useEffect(() => {
    loadMoreMovies(page).then((data) => {
      setMovies(data.results)
      setTotalPages(data.total_pages)
      setLoading(false)
    })
  }, [page])

  const loadMore = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > totalPages) {
        nextPage = totalPages
      }
      return nextPage
    })
  }

  const handleStartDate = (e) => {
    setStartDate(e.target.value)
  }

  const handleEndDate = (e) => {
    setEndDate(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    filterMoviesByDate(startDate, endDate).then((data) => {
      setMovies(data.results)
    })
  }

  return (
    <section className="p-8 min-h-[60vh] ">
      <div className="movies-content ml-[56px]">
        <div
          className=""
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 3fr',
          }}
        >
          <div className="left h-full p-5">
            <h3 className="mb-4">Filter by Genres</h3>
            <div className="flex flex-wrap gap-2 h-max">
              <button
                style={{
                  backgroundColor: genreId === 0 ? 'orangered' : 'transparent',
                }}
                className="btn btn-primary
                    bg-[rgb(45, 45, 45)] border border-gray-900 py-1 px-2 rounded-md text-sm font-light"
                onClick={() => {
                  filterMovies().then((data) => {
                    setMovies(data.results)
                    setGenreId(0)
                  })
                }}
              >
                All
              </button>
              {_genres.map(({ id, name }) => {
                return (
                  <button
                    style={{
                      backgroundColor:
                        id === genreId ? 'orangered' : 'transparent',
                    }}
                    key={id}
                    className="btn btn-primary
                    bg-[rgb(45, 45, 45)] border border-gray-900 py-1 px-2 rounded-md text-sm font-light
                    "
                    onClick={() => {
                      filterMoviesByGenre(id).then((data) => {
                        setMovies(data.results)
                        setGenreId(id)
                      })
                    }}
                  >
                    {name}
                  </button>
                )
              })}
            </div>
            <h3 className="mt-4 mb-4">Filter by release date</h3>
            <div className="flex flex-wrap gap-2 h-max">
              <form action="">
                <div className="flex gap-2">
                  <input
                    onChange={handleStartDate}
                    type="date"
                    value={startDate}
                    className="start-date bg-transparent border border-gray-900 py-1 px-2 rounded-md text-sm font-light"
                  />
                  <input
                    type="date"
                    onChange={handleEndDate}
                    value={endDate}
                    className="end-date bg-transparent border border-gray-900 py-1 px-2 rounded-md text-sm font-light"
                  />
                </div>
                <button
                  className="btn btn-primary mt-2 w-full bg-orange-600
                    bg-[rgb(45, 45, 45)] border border-gray-900 py-2 px-2  text-sm font-light
                    "
                  onClick={handleSearch}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="right">
            <div className="grid grid-cols-4 gap-4">
              {movies.map((movie) => {
                const { id, title, poster_path, vote_average } = movie
                return (
                  <Link
                    to={`/movies/${id}`}
                    key={id}
                    onClick={() => {
                      scrollToTop()
                    }}
                  >
                    <div
                      key={id}
                      className="movie-card bg-[#222222] p-4 rounded-md"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        alt={title}
                      />
                      <div className="movie-info">
                        <h4 className="text-white">{title}</h4>
                        <p className="text-white">{vote_average}</p>
                        <button className="btn btn-primary">
                          View Details
                        </button>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
            {!loading && (
              <>
                <div className="flex justify-center mt-4">
                  {' '}
                  <button
                    className=" mt-4 bg-orange-600 w-full
                    text-white hover:text-white  px-4 py-2 
                    "
                    onClick={() => {
                      loadMore()
                      scrollToTop()
                    }}
                    disabled={page === totalPages}
                  >
                    Load More
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Movies }
