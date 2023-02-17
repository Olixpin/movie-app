import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { getMovies } from './utils/api'
import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom'
import { Layout } from './layouts'
import { Home, About, Error } from './pages'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      // {
      //   path: '/movies',
      //   element: <Movies />,
      // },
      // {
      //   path: '/movies/:movieId',
    ],
  },
])

function App() {
  return (
    <RouterProvider
      router={Router}
      errorBoundary={RootErrorBoundary}
      fallback={<Fallback />}
    >
      <Routes />
    </RouterProvider>
  )
}

export default App

export function RootErrorBoundary() {
  let error = useRouteError() || useErrorBoundaryError()
  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = '/')}>
        Click here to reload the app
      </button>
    </div>
  )
}

export function Fallback() {
  return <p>Performing initial data "load"</p>
}
