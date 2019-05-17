import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Queue views
import QueueList from 'views/Queue/QueueList'
// import QueueCreate from "views/Queue/QueueCreate"

const QueueRouter = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url + '/'} component={QueueList} />
      {/* <Route exact path={match.url + "/add"} component={QueueCreate} /> */}
      {/* <Route exact path={match.url + "/edit/:id"} component={QueueCreate} /> */}
    </Switch>
  </div>
)

export default QueueRouter
