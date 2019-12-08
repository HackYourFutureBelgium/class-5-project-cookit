import React, {Component} from "react"

import MainBody from './MainBody'
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import './Main.css'


class Main extends Component {
render() {
    return (
      <BrowserRouter>
        <div className="Main">
        <Navbar />
        
        <Switch>
           

            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
        
        </Switch>
        </div>
		<MainBody />
      </BrowserRouter>
    );
  }
}

export default Main;
