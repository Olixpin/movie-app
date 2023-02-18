import React, { useEffect, useState } from 'react'
import { RxDotFilled } from 'react-icons/rx'
import { useParams } from 'react-router-dom'
import { movieId } from '../utils/api'
import './Movie.css'

const Movie = () => {
  const [movie, setMovie] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    movieId(id).then((data) => {
      setMovie(data)
    })
  }, [id])

  console.log(movie)

  return (
    <>
      <section
        className="each-movie h-[100vh] p-8 bg-[rgb(45, 45, 45)]"
        style={{
          backgroundImage: movie
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="movie-content ml-[56px] grid grid-cols-3 justify-center items-center max-[1028px]:grid-cols-2 max-[728px]:grid-cols-1 max-[500px]:p-0">
          <div className="left flex flex-col gap-4">
            <h1 className="text-5xl font-bold text-white"> {movie?.title}</h1>
            <p className="text-white">{movie?.overview}</p>
            <div className="flex items-center">
              <RxDotFilled className="text-orange-500" />
              <p className="text-white ml-2">{movie?.vote_average}</p>
            </div>
            <p className="text-white">Release date {movie?.release_date}</p>

            <div className="flex items-center">
              <p className="text-white">Genre:</p>
              <div className="flex items-center ml-2">
                {movie?.genres.map((genre) => {
                  return (
                    <p key={genre.id} className="text-white ml-2">
                      {genre.name}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </section>
    </>
  )
}

export { Movie }
