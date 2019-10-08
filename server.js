const express = require('express')
const path = require('path')

const app = express()

// Serve the static files from the React app
app.use(
  express.static(path.join(__dirname, 'build'), {
    setHeaders: function (res, path, stat) {
      res.setHeader(
        'Cache-Control',
        '"no-store", "no-cache", "must-revalidate", "proxy-revalidate", "max-age=0"'
      )
    }
  })
)

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.setHeader(
    'Cache-Control',
    '"no-store", "no-cache", "must-revalidate", "proxy-revalidate", "max-age=0"'
  )
  res.sendFile(path.join(__dirname + '/build/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port)

console.log('App is listening on port ' + port)
