import React, { Component } from 'react';
import EpicMenu from './EpicMenu';
import FirstSection from './FirstSection';
import '../App.css'
import logo from '../cookit.png';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';
import Main from './Main';




class App extends Component {
  render() {
    const links = [
      { label: 'Home', link: '#home', active: true },
      { label: 'About', link: '#about' },
      { label: 'Cookit', link: '#cookit' },
      { label: 'Contact Us', link: '#contact-us' },

    ];

    return (

      <>
        <EpicMenu links={links} logo={logo} />
        <FirstSection />
        <Main />


      </>

    );
  }
}

export default App;
