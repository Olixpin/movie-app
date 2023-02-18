const randomMovies = (movies) => {
  const randomMovies = []

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * movies.length)
    randomMovies.push(movies[randomIndex])
  }

  return randomMovies
}

export { randomMovies }
