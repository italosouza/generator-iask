import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { logout } from 'services/auth'

import dashboardRoutes from 'routes/dashboard'

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />
      return <Route path={prop.path} component={prop.component} key={key} />
    })}
  </Switch>
)

// TODO: create a Sidebar component
class Dashboard extends React.Component {
  state = {
    mobileOpen: false,
    open: true,
    anchorEl: null,
    mobileMoreAnchorEl: null
  }

  handleLogout = event => {
    event.preventDefault()
    logout()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="main-wrapper">
        <div className="content">
          {switchRoutes}
          <br />
          <button onClick={this.handleLogout}>Sair</button>
        </div>
      </div>
    )
  }
}

export default Dashboard
