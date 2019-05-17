import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Vm views
import VmList from 'views/Vm/VmList'
// import VmCreate from "views/Vm/VmCreate"

const VmRouter = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url + '/'} component={VmList} />
      {/* <Route exact path={match.url + "/add"} component={VmCreate} /> */}
      {/* <Route exact path={match.url + "/edit/:id"} component={VmCreate} /> */}
    </Switch>
  </div>
)

export default VmRouter
