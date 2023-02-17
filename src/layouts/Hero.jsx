import React from 'react'
import './Hero.css'
import settings from '../assets/settings.svg'
import account from '../assets/account.svg'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-login">
          <Link to="/login">
            <img src={account} alt="account" />
          </Link>
          <Link to="/settings">
            <img src={settings} alt="settings" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export { Hero }
