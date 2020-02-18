import qs from 'querystring'
import axios from 'axios'

module.exports = async (req, res, next) => {
  const client_id = 'b6e8e935a3e248d88f73639b206c0698'
  const client_secret = '307b2c8895dd448a9908f2231608a77d'
  try {
    const data = { grant_type: 'client_credentials' }
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      {
        headers: {
          Authorization:
            'Basic ' +
            new Buffer.from(client_id + ':' + client_secret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    const token = response.data.token_type + ' ' + response.data.access_token
    req.token = token
    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
