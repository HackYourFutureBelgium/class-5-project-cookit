import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';

class MainMenu extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="MainMenu">
          <Navbar />

          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default MainMenu;
