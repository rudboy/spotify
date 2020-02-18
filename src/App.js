import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './app.css'

export default class App extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: 'black',
        }}>
        <nav className="navbar navbar-light bg-light">
          <Link className="navbar-brand mb-0 h1" to="/">
            Test technique Totem
          </Link>
        </nav>
        {this.props.children}
        <div className="container">
          <footer className="footer">&copy; 2017 - Totem by Ingima</footer>
        </div>
      </div>
    )
  }
}
