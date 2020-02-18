import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import body_parser from 'body-parser'
import artisteRoutes from './routes/artisteRoute'
import albumByArtist from './routes/albumsRoute'
import tracksByAlbum from './routes/tracksRoute'

/* eslint-disable no-console */

const port = process.env.PORT || 3001
const app = express()

app.use(
  body_parser.json({ limit: '100000kb' }),
  cors(),
  helmet(),
  compression(),
  artisteRoutes,
  albumByArtist,
  tracksByAlbum
)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log('Server listening: http://localhost:%s', port)
  }
})
