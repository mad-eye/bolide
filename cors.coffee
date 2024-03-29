## CORS middleware
# see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
module.exports = allowCrossDomainSetup = () ->
  return (req, res, next) ->
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header 'Access-Control-Expose-Headers', 'x-ot-version'
    # intercept OPTIONS method
    if 'OPTIONS' == req.method
      res.send(200)
    else
      next()
