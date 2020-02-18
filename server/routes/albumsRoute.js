import express from 'express'
import cors from 'cors'
import body_parser from 'body-parser'
import axios from 'axios'
const router = express.Router()
import isAthenticated from '../middleware/isAthenticated'

router.use(body_parser.json(), cors())

router.get('/found_artist_album', isAthenticated, async (req, res) => {
  if (req.token) {
    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/artists/' +
          req.query.id +
          '/albums?include_groups=album&market=ES&limit=12&offset=5',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: req.token,
          },
        }
      )
      res.json(response.data)
    } catch (error) {
      res.status(400).json({ error: { message: error.message } })
    }
  }
})

module.exports = router
