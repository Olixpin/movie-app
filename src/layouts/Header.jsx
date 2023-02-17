import React from 'react'
import './Header.css'
import logo from '../assets/logo.svg'
import home from '../assets/home.svg'
import movie from '../assets/movie.svg'
import star from '../assets/star-stroke.svg'
import tv from '../assets/tv.svg'
import { Link } from 'react-router-dom'

const links = [
  {
    id: 1,
    name: 'Home',
    path: '/',
    icon: home,
  },
  {
    id: 2,
    name: 'Movies',
    path: '/movies',
    icon: movie,
  },

  {
    id: 3,
    name: 'TV Shows',
    path: '/tv-shows',
    icon: tv,
  },
  {
    id: 4,
    name: 'Top Rated',
    path: '/top-rated',
    icon: star,
  },
]

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <nav>
          <ul>
            {links.map((link) => {
              const { id, name, path, icon } = link
              return (
                <li key={id}>
                  <Link to={path}>
                    <img src={icon} alt={name} />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export { Header }
