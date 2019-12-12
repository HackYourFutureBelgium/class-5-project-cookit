import React, { useEffect, useState } from 'react';
//to perform routing
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import logo from './logo.png';


//import connect modul
import { connect } from 'react-redux';

const Navbar = (props) => {
  console.log('props :', props);
  const { auth, profile } = props
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />

  return (

    <nav className="nav-wrapper white">

      <div className="container2">

        <img className="brand-logo.center" src={logo} alt="Logo" />


        {links}
      </div>
    </nav>
  )
}


const mapStateToProps = (state) => {
  console.log(state);

  return {
    auth: state.firebase.auth,

    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)