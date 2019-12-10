import React, {Component} from "react"
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import './Main.css'


class MainMenu extends Component {
render() {
    return (
      <BrowserRouter>
        <div className="MainMenu">
        <Navbar />
        
        <Switch>
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
        
        </Switch>
        </div>
	
      </BrowserRouter>
    );
  }
}

export default MainMenu;
