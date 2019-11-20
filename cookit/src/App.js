import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./components/Main";
import Recipes from "./components/Recipes";
import Search from "./components/Search";
function App() {
  return (
    <div className="App">
      <Router>
        <Main />

        <Switch>
          <Route path="/recipes" exact>
            <Recipes />
          </Route>
        </Switch>
        <Switch>
          <Route path="/search" exact>
            <Search />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
