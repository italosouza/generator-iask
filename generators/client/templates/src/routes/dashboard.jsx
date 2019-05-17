// @material-ui/icons
// import Person from '@material-ui/icons/Person'
// import Unarchive from '@material-ui/icons/Unarchive'

// views
import QueueRouter from 'views/Queue/QueueRouter'
import VmRouter from 'views/Vm/VmRouter'

const dashboardRoutes = [
  {
    path: '/queue',
    sidebarName: 'Fila',
    navbarName: 'Fila',
    // icon: Person,
    component: QueueRouter
  },
  {
    path: '/vm',
    sidebarName: 'VM',
    navbarName: 'VM',
    // icon: Unarchive,
    component: VmRouter
  },
  { redirect: true, path: '/', to: '/queue', navbarName: 'Redirect' }
]

export default dashboardRoutes
