import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Zoom from '../modal/zoom'

class DemoPage extends React.Component {
  state = {
    searchValue: null,
    artistsTab: [],
    previous: null,
    next: null,
    show: false,
    selectIndex: null,
    selectImg: null,
    notFound: false,
  }
  componentDidMount = async () => {
    // if (this.props.location.state.searchValue) {
    //   try {
    //     this.setState({ searchValue: this.props.location.state.searchValue })
    //     this.foundArtiste(this.props.location.state.searchValue)
    //   } catch (error) {
    //     console.log(error.message)
    //   }
    // }
  }

  handleChange = event => {
    this.setState({ searchValue: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.searchValue === null || this.state.searchValue === '') {
      alert('Veuillez remplir le champ')
    }
    if (event.target.name === 'search-btn') {
      this.foundArtiste(this.state.searchValue)
    }
  }
  foundArtiste = async artiste => {
    try {
      const response = await axios.get(
        'http://spotify-ruddy.netlify.com/search_artiste?name=' + artiste
      )
      this.setState({
        artistsTab: response.data.artists.items,
        previous: response.data.artists.previous,
        next: response.data.artists.next,
        notFound: false,
      })
      if (response.data.items.length === 0) {
        this.setState({ notFound: true })
      }
      console.log(response.data)
    } catch (error) {
      console.log(error.message)
      this.setState({ notFound: true })
    }
  }
  getImages = tab => {
    if (tab.length === 0) {
      return 'http://placehold.it/64x64'
    } else if (tab.length >= 1) {
      return tab[0].url
    }
  }

  next = async () => {
    try {
      const response = await axios.get(
        'http://spotify-ruddy.netlify.com/next?url=' + this.state.next
      )
      this.setState({
        artistsTab: response.data.artists.items,
        previous: response.data.artists.previous,
        next: response.data.artists.next,
      })
    } catch (error) {}
  }
  previous = async () => {
    try {
      const response = await axios.get(
        'http://spotify-ruddy.netlify.com/previous?url=' + this.state.previous
      )
      this.setState({
        artistsTab: response.data.artists.items,
        previous: response.data.artists.previous,
        next: response.data.artists.next,
      })
    } catch (error) {}
  }
  pagination = () => {
    return (
      <div className="container text-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className="page-item">
              {this.state.previous ? (
                <a
                  className="page-link"
                  id="active"
                  onClick={() => {
                    this.previous()
                  }}>
                  Previous
                </a>
              ) : (
                <a className="page-link">Previous</a>
              )}
            </li>

            <li className="page-item">
              {this.state.next ? (
                <a
                  className="page-link"
                  id="active"
                  onClick={() => {
                    this.next()
                  }}>
                  Next
                </a>
              ) : (
                <a className="page-link">Next</a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    )
  }
  zoomImageIN = (index, img) => {
    this.setState({ show: true, selectIndex: index, selectImg: img[0].url })
  }
  zoomImageOUT = () => {
    this.setState({ show: false })
  }

  render() {
    return (
      <div>
        <div>
          <div className="container">
            <div className="container_logo">
              <img
                className="logo"
                src="https://1.bp.blogspot.com/-xtFG2HxsdKc/XHkuICL5ePI/AAAAAAAAIPs/-FBy2Apa3qUxBF1WNOzB_dF4_KUuLJrygCK4BGAYYCw/s1600/spotify%2Bicon%2B.png"
                alt="Generic placeholder image"
              />
            </div>
            <div className="page-header">
              <h1>Artistes</h1>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">Rechercher un artiste Spotify</div>
              <div className="panel-body">
                <form className="form-inline">
                  <div className="form-group">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Mot(s)-clé(s)"
                      onChange={this.handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success"
                    name="search-btn"
                    onClick={this.handleSubmit}>
                    Chercher
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="container artists">
            {this.state.artistsTab.length === 0 && this.state.notFound ? (
              <p className="not_found">
                Aucun artiste ne corespond a la recherche
              </p>
            ) : (
              ''
            )}
            {this.state.artistsTab.map((artists, index) => {
              return (
                <div className="media-container" key={index}>
                  <div className="media">
                    <img
                      className="align-self-start mr-3"
                      src={this.getImages(artists.images)}
                      alt="Generic placeholder image"
                      onMouseEnter={() => {
                        this.zoomImageIN(index, artists.images)
                      }}
                      onMouseOut={() => {
                        this.zoomImageOUT()
                      }}
                    />

                    <div className="media-body">
                      <h5 className="mt-0">{artists.name}</h5>
                      <p className="mt-1">
                        {artists.genres.join(' , ').substring(0, 50) + '...'}
                      </p>
                    </div>
                  </div>

                  <Link
                    className="btn btn-outline-success"
                    name="search-btn"
                    to={{
                      pathname: '/Albums/' + artists.id,
                      state: {
                        album_artist: artists.name,
                        artist_id: artists.id,
                        searchValue: this.state.searchValue,
                      },
                    }}>
                    Voir L'Album
                  </Link>
                </div>
              )
            })}
            {this.state.show ? <Zoom image={this.state.selectImg} /> : ''}
          </div>

          {this.state.artistsTab.length === 0 ? <p /> : this.pagination()}
        </div>
      </div>
    )
  }
}

export default DemoPage
