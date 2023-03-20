import React from 'react'
import routes from '../../routes/sidebar'
import { NavLink, Route } from 'react-router-dom'
import * as Icons from '../../icons'
import Cookies from "js-cookie";
import ImageMeeting from '../../assets/img/meeting.png'

const role = Cookies.get("role");

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContent() {
  return (
    <div className="text-gray-500">
      <div className="mt-3 flex text-start h-20">
        <div className="m-auto mx-4 text-gray-800 font-bold text-lg">
          <img
            aria-hidden="true"
            className="object-cover w-full h-full dark:hidden"
            src={ImageMeeting}
            alt="Office"
          />
        </div>
      </div>
      <ul className="mt-6">
        {routes.map((route) => {
          return (route.role == "all" || route.role == role) ? (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          ) : (
            null
          )
        }
        )}
      </ul>
    </div>
  )
}

export default SidebarContent
