const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)

  if (err.name === 'TokenExpiredError') {
    return res.json({
      message: 'El token expiro. Intente iniciar sesión nuevamente'
    })
  }
  
  res.json({
    message: err.message
  })
}

export { notFound, errorHandler }
