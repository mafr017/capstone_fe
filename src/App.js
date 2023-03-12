import Cookies from 'js-cookie';
import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { useAuth } from './hooks/auth';

const Layout = lazy(() => import('./components/layout/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))

function App() {
  // State  

  // hooks
  const { isLoggedIn, isLoggedInSet, isReady } = useAuth();
  const navigate = useHistory();
  console.log("isLoggedIn: " + isLoggedIn)
  // Func
  const handleLogin = val => {
    Cookies.set("token", "123");
    isLoggedInSet(true);
    navigate.push("/app");
  }
  // Handler        

  // useEffect  

  if (!isReady) return null;
  return (
    isLoggedIn ?
      <>
        <Router>
          {/* <AccessibleNavigationAnnouncer /> */}
          <Switch>
            {/* Place new routes over this */}
            <Route path="/app" component={Layout} />
            {/* If you have an index page, you can remothis Redirect */}
            <Redirect exact from="/" to="/app" />
            <Redirect exact from="*" to="/app" />
          </Switch>
        </Router>
      </>
      :
      <>
        <Router>
          {/* <AccessibleNavigationAnnouncer /> */}
          <Switch>
            <Route path="/login" render={() => <Login loginSet={handleLogin} />} />
            {/* <Route path="/login" component={Login} /> */}
            <Route path="/create-account" component={CreateAccount} />

            {/* If you have an index page, you can remothis Redirect */}
            <Redirect exact from="/" to="/login" />
            <Redirect exact from="*" to="/login" />
          </Switch>
        </Router>
      </>
  )
}

export default App
