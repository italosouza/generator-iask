import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

// components
import { isAuthenticated } from 'services/auth'
import Dashboard from 'layouts/Dashboard/Dashboard'
import Login from 'views/Login/Login'
import Register from 'views/Register/Register'

// private routes can only be accessed by authed users - No ACL yet
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    exact
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
)

const hist = createBrowserHistory()
const Routes = () => (
  <Router history={hist}>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute path="/" component={Dashboard} />
    </Switch>
  </Router>
)

export default Routes
