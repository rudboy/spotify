import express from 'express'
import cors from 'cors'
import body_parser from 'body-parser'
import axios from 'axios'
const router = express.Router()
import isAthenticated from '../middleware/isAthenticated'

router.use(body_parser.json(), cors())

router.get('/get_album_tracks', isAthenticated, async (req, res) => {
  if (req.token) {
    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/albums/' + req.query.id + '/tracks',
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
