import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import NavBar from "./components/nav/navbar"
import AuthPage from "./pages/Auth"
import BookingsPage from "./pages/Bookings"
import SpacesPage from "./pages/Spaces"
import Upload from "./pages/Upload"
import Spaces from './components/spaces/space_index_container'
import AuthContext from './context/auth-context'

class App extends Component {
  state = {
    token: null,
    userID: null
  }
  login = (token, userId, tokenExpiration) => {
    this.setState({token: token, userID: userId})
  }

  logout = () => {
    this.setState({token: null, userId: null})
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider value={{ 
            token: this.state.token,
            userId: this.state.userId,
            login: this.login, 
            logout: this.logout }}>
            <NavBar />
            <main>
              <Switch> 
                <Route path="/upload" component={Upload} />
                {this.state.token && <Redirect from="/" to="/spaces" exact />}
                {this.state.token && <Redirect from="/auth" to="/spaces" exact />}
                {!this.state.token && <Route path="/auth" component={AuthPage} />}
                <Route path="/spaces" component={Spaces} />
                {this.state.token && <Route path="/bookings" component={BookingsPage} />}
                {!this.state.token && <Redirect to="/auth" exact />}
                </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }

}

export default App;
