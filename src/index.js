import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import App from './App'
import NotFoundPage from './containers/NotFound'
import DemoPage from './containers/DemoPage'
import Albums from './containers/Albums'
import Tracks from './containers/Tracks'
import Search from './containers/search'

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <App>
      <Switch>
        <Route exact path="/" component={DemoPage} />
        {/* <Route component={NotFoundPage} /> */}
        <Route
          path="/Albums/:ArtistId"
          //component={Albums}
          render={props => <Albums {...props} />}
        />
        <Route
          path="/Tracks/:AlbumId"
          render={props => <Tracks {...props} />}
        />
        <Route path="/Search" render={props => <Search {...props} />} />
      </Switch>
    </App>
  </Router>,
  document.getElementById('root')
)
