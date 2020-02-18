import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Albums extends React.Component {
  state = {
    tabAlbum: [],
    notFound: false,
  }

  componentDidMount = async () => {
    try {
      const response = await axios.get(
        'http://spotify-ruddy.netlify.com/found_artist_album?id=' +
          this.props.match.params.ArtistId
      )

      this.setState({ tabAlbum: response.data.items })
      if (response.data.items.length === 0) {
        this.setState({ notFound: true })
      }
    } catch (error) {
      console.log(error.message)
    }
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
                className="Link-Search"
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
              {this.props.location.state.album_artist}
            </li>
          </ol>
        </nav>
        <div className="page-header">
          <h1>Albums</h1>
          <h2>{this.props.location.state.album_artist}</h2>
        </div>

        <div className="container">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            {this.state.notFound ? (
              <p className="not_found">Aucun album pour cet artiste</p>
            ) : (
              ''
            )}
            {this.state.tabAlbum.map((album, index) => {
              return (
                <Link
                  className="card"
                  style={{ width: '14rem' }}
                  key={index}
                  to={{
                    pathname: '/Tracks/' + album.id,
                    state: {
                      album_img: album.images[0].url,
                      album_name: album.name,
                      album_artist: this.props.location.state.album_artist,
                      artist_id: this.props.match.params.ArtistId,
                      searchValue: this.props.location.state.searchValue,
                    },
                  }}>
                  <img
                    className="card-img-top"
                    src={album.images[0].url}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <p className="card-text">{album.name}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Albums
