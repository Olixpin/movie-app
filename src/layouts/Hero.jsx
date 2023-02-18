import React, { useEffect, useState } from 'react'
import './Hero.css'
import settings from '../assets/settings.svg'
import account from '../assets/account.svg'
import right from '../assets/chevron-right.svg'
import left from '../assets/chevron-left.svg'
import hero from '../assets/hero-bg.png'
import { Link } from 'react-router-dom'
import { getTrendingMovies } from '../utils/api'
import { randomMovies } from '../utils/random-movies'
import { RxDotFilled } from 'react-icons/rx'

const Hero = () => {
  const [randomMovie, setRandomMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    getTrendingMovies().then((data) => {
      setRandomMovie(randomMovies(data.results))
      setLoading(false)
    })
  }, [])

  const prevSlide = () => {
    setIndex(index === 0 ? randomMovie?.length - 1 : index - 1)
  }

  const nextSlide = () => {
    setIndex(index === randomMovie?.length - 1 ? 0 : index + 1)
  }

  const goToSlide = (index) => {
    setIndex(index)
  }

  console.log(randomMovie ? randomMovie[index] : hero)

  return (
    <div
      className="hero"
      style={{
        backgroundImage: randomMovie
          ? `url(https://image.tmdb.org/t/p/original${randomMovie[index]?.backdrop_path})`
          : `url(${hero})`,

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="hero-content relative">
        <div className="hero-login">
          <Link to="/login">
            <img src={account} alt="account" />
          </Link>
          <Link to="/settings">
            <img src={settings} alt="settings" />
          </Link>
        </div>

        {/* <div className="arrow-left " onClick={prevSlide}>
          <img src={left} alt="left" />
        </div> */}
        <div className="arrow-right " onClick={nextSlide}>
          <img src={right} alt="right" />
        </div>
        <div
          className="flex justify-center py-2 absolute
        bottom-0 w-full
        "
        >
          {randomMovie &&
            randomMovie.map((movie, movieIndex) => {
              return (
                <div key={movieIndex} className="mx-2">
                  <RxDotFilled
                    style={{
                      cursor: 'pointer',
                    }}
                    size={20}
                    onClick={() => goToSlide(movieIndex)}
                    color={movieIndex === index ? 'white' : 'gray'}
                  />
                </div>
              )
            })}
        </div>
        <div
          className="hero-text h-full grid justify-center
            grid-cols-3 items-center max-[1040px]:grid-cols-2 pl-8 pr-8 max-[728px]:grid-cols-1 max-[728px]:p-0
        "
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">
              {randomMovie ? randomMovie[index]?.title : null}
            </h1>
            <p className="text-xs leading-6">
              {randomMovie ? randomMovie[index]?.overview : null}
            </p>
            <div className="flex gap-4">
              <button
                className="btn btn-primary
                border border-white px-4 py-2
              "
              >
                <Link
                  className="text-white font-light hover:text-white"
                  to={`/movies/${randomMovie ? randomMovie[index]?.id : null}`}
                >
                  Get Details
                </Link>
              </button>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  )
}

export { Hero }
