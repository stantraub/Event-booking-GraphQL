import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import NavBar from "./components/nav/navbar"
import AuthPage from "./pages/Auth"
import BookingsPage from "./pages/Bookings"
import SpacePage from "./pages/Spaces"

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <NavBar />
        <main>
          <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={AuthPage} />
            <Route path="/spaces" component={SpacePage} />
            <Route path="/bookings" component={BookingsPage} />
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
