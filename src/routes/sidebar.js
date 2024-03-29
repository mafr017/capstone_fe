/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard',
    role: 'all',
    icon: 'HomeIcon',
    name: 'Dashboard',
  },
  {
    path: '/app/room',
    role: 'admin',
    icon: 'PeopleRoof',
    name: 'Rooms',
  },
  {
    path: '/app/room-user',
    role: 'user',
    icon: 'PeopleRoof',
    name: 'Rooms User',
  },
  {
    path: '/app/reservation',
    role: 'admin',
    icon: 'ChalkBoardUserIcon',
    name: 'Reservations',
  },
  {
    path: '/app/reservation-user',
    role: 'user',
    icon: 'ChalkBoardUserIcon',
    name: 'Reservations User',
  },
  {
    path: '/app/report',
    role: 'all',
    icon: 'FormsIcon',
    name: 'Report',
  },
  // {
  //   path: '/app/dashboard-sample', // the url
  //   icon: 'HomeIcon', // the component being exported from icons/index.js
  //   name: 'Sample Dashboard', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/forms',
  //   icon: 'FormsIcon',
  //   name: 'Sample Forms',
  // },
  // {
  //   path: '/app/cards',
  //   icon: 'CardsIcon',
  //   name: 'Sample Cards',
  // },
  // {
  //   path: '/app/charts',
  //   icon: 'ChartsIcon',
  //   name: 'Sample Charts',
  // },
  // {
  //   path: '/app/buttons',
  //   icon: 'ButtonsIcon',
  //   name: 'Sample Buttons',
  // },
  // {
  //   path: '/app/modals',
  //   icon: 'ModalsIcon',
  //   name: 'Sample Modals',
  // },
  // {
  //   path: '/app/tables',
  //   icon: 'TablesIcon',
  //   name: 'Sample Tables',
  // },
  // {
  //   icon: 'PagesIcon',
  //   name: 'Sample Pages',
  //   routes: [
  //     // submenu
  //     {
  //       path: '/login',
  //       name: 'Sample Login',
  //     },
  //     {
  //       path: '/create-account',
  //       name: 'Sample Create account',
  //     },
  //     {
  //       path: '/forgot-password',
  //       name: 'Sample Forgot password',
  //     },
  //     {
  //       path: '/app/404',
  //       name: '404',
  //     },
  //     {
  //       path: '/app/blank',
  //       name: 'Sample Blank',
  //     },
  //   ],
  // },
]

export default routes
