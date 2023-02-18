import React from 'react'
import './Header.css'
import logo from '../assets/logo.svg'
import home from '../assets/home.svg'
import movie from '../assets/movie.svg'
import star from '../assets/star-stroke.svg'
import tv from '../assets/tv.svg'
import { Link, useParams } from 'react-router-dom'
import { movieId } from '../utils/api'
import setting from '../assets/settings.svg'
import account from '../assets/account.svg'

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
  const [scrollUp, setScrollUp] = React.useState(true)
  const { id } = useParams()

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollUp(false)
      } else {
        setScrollUp(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  console.log(scrollUp)
  return (
    <>
      {scrollUp && (
        <header
          style={{
            height: id ? '100vh' : '',
          }}
        >
          <div className="header-content">
            <Link to="/">
              <img src={logo} alt="logo" className="logo-header" />
            </Link>
            <nav>
              <ul>
                {links.map((link) => {
                  const { id, name, path, icon } = link
                  return (
                    <li key={id}>
                      <Link to={path} title={name}>
                        <img src={icon} alt={name} />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {id && (
              <div className="absolute bottom-12 flex flex-col gap-4">
                <img src={setting} alt="setting" className="setting h-4" />
                <img src={account} alt="account" className="account h-4" />
              </div>
            )}
          </div>
        </header>
      )}
    </>
  )
}

export { Header }
