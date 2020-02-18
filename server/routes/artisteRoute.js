import express from 'express'
import cors from 'cors'
import body_parser from 'body-parser'
import axios from 'axios'
const router = express.Router()
import isAthenticated from '../middleware/isAthenticated'

router.use(body_parser.json(), cors())

router.get('/search_artiste', isAthenticated, async (req, res) => {
  if (req.token) {
    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/search?q=' +
          req.query.name +
          '&type=artist&limit=3',
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

router.get('/next', isAthenticated, async (req, res) => {
  if (req.token) {
    try {
      const url =
        req.query.url +
        '&type=' +
        req.query.type +
        '&offset=' +
        req.query.offset +
        '&limit=' +
        req.query.limit
      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: req.token,
        },
      })
      res.json(response.data)
    } catch (error) {
      res.status(400).json({ error: { message: error.message } })
    }
  }
})
router.get('/previous', isAthenticated, async (req, res) => {
  if (req.token) {
    try {
      const url =
        req.query.url +
        '&type=' +
        req.query.type +
        '&offset=' +
        req.query.offset +
        '&limit=' +
        req.query.limit
      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: req.token,
        },
      })
      res.json(response.data)
    } catch (error) {
      res.status(400).json({ error: { message: error.message } })
    }
  }
})

module.exports = router
