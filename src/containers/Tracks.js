import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Tracks extends React.Component {
  state = { tabTracks: [] }

  componentDidMount = async () => {
    try {
      const response = await axios.get(
        'http://spotify-ruddy.netlify.com/get_album_tracks?id=' +
          this.props.match.params.AlbumId
      )
      this.setState({ tabTracks: response.data.items })
    } catch (error) {}
  }
  millisToMinutesAndSeconds = millis => {
    var minutes = Math.floor(millis / 60000)
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  render() {
    return (
      <div className="container">
        <div className="container_logo">
          <img
            className="logo_album"
            src="https://1.bp.blogspot.com/-xtFG2HxsdKc/XHkuICL5ePI/AAAAAAAAIPs/-FBy2Apa3qUxBF1WNOzB_dF4_KUuLJrygCK4BGAYYCw/s1600/spotify%2Bicon%2B.png"
            alt="Generic placeholder image"
          />
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link
                to={{
                  pathname: '/Search',
                  state: {
                    searchValue: this.props.location.state.searchValue,
                  },
                }}>
                Recherche {this.props.location.state.searchValue}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Link
                className="Link-Album"
                to={{
                  pathname: '/Albums/' + this.props.location.state.artist_id,
                  state: {
                    album_artist: this.props.location.state.album_artist,
                    searchValue: this.props.location.state.searchValue,
                  },
                }}>
                {this.props.location.state.album_artist}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {this.props.location.state.album_name}
            </li>
          </ol>
        </nav>
        <div className="page-header">
          <h1>Pistes</h1>
          <h2>
            {this.props.location.state.album_artist} -
            {this.props.location.state.album_name}
          </h2>
        </div>
        <div className="container">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div className="col">
              <img
                src={this.props.location.state.album_img}
                className="thumbnail img-responsive"
                alt={'Album name'}
              />
            </div>
            <div className="col">
              <ul className="list-group">
                {this.state.tabTracks.map((tracks, index) => {
                  return (
                    <li className="list-group-item" key={index}>
                      {tracks.index} {tracks.name}
                      <span className="badge">
                        {this.millisToMinutesAndSeconds(tracks.duration_ms)}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Tracks
