import React, { Component } from 'react';
import FirstSection from './components/FirstSection';
import MainMenu from "./MainMenu"
import Main from "./Main"
import './App.css'

class App extends Component {
  render() {
    return (
      <>
        <MainMenu />
        <FirstSection />
        <Main />
        
       
      </>
    );
  }
}

export default App;
