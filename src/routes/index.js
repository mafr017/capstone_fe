import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'))
const Rooms = lazy(() => import('../pages/room/Room'))
const RoomsUser = lazy(() => import('../pages/room/RoomUser'))
const RoomManage = lazy(() => import('../pages/room/RoomManage'))
const Reservation = lazy(() => import('../pages/reservation/Reservation'))
const ReservationUser = lazy(() => import('../pages/reservation/ReservationUser'))
const ReservatioManage = lazy(() => import('../pages/reservation/ReservatioManage'))
const Report = lazy(() => import('../pages/report/Report'))
// SAMPLE
const DashboardSample = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/room',
    component: Rooms,
  },
  {
    path: '/room-user',
    component: RoomsUser,
  },
  {
    path: '/room/manage',
    component: RoomManage,
  },
  {
    path: '/reservation',
    component: Reservation,
  },
  {
    path: '/reservation-user',
    component: ReservationUser,
  },
  {
    path: '/reservation/manage',
    component: ReservatioManage,
  },
  {
    path: '/report',
    component: Report,
  },
  {
    path: '/dashboard-sample',
    component: DashboardSample,
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
