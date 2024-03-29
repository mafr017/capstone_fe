import React, { useContext, useEffect, useState } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import {
  MenuIcon,
  OutlineLogoutIcon,
} from '../icons'
import { Avatar, Dropdown, DropdownItem } from '@windmill/react-ui'
import Cookies from 'js-cookie'

function Header() {
  const { toggleSidebar } = useContext(SidebarContext)
  const [hello, helloSet] = useState(false)

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  function getTime() {
    let now = new Date().getHours();
    if (now >= 5 && now <= 12) {
      helloSet(() => "Good Morning")
    }
    if (now > 12 && now <= 18) {
      helloSet(() => "Good Afternoon")
    }
    if (now > 18 && now <= 21) {
      helloSet(() => "Good Evening")
    }
    if (now > 21 || (now > 0 && now < 5)) {
      helloSet(() => "Good Night")
    }
  }

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  useEffect(() => {
    getTime()
  }, [])

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          {/* <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Search for projects"
              aria-label="Search"
            />
          </div> */}
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <span className='my-auto mr-4'>
              {hello}, {Cookies.get("firstName")} {Cookies.get("lastName") !== "null" ? Cookies.get("lastName") : ""}
            </span>
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src="https://img.icons8.com/ios-glyphs/512/user--v1.png"
                alt=""
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem onClick={() => {
                Cookies.remove("token");
                Cookies.remove("firstName");
                Cookies.remove("email");
                Cookies.remove("username");
                Cookies.remove("id");
                Cookies.remove("lastName");
                window.location.reload();
              }}>
                <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
