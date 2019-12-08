import React from 'react';
//to perform routing
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import logo from './logo.png';

//import connect modul
import {connect} from 'react-redux';

const Navbar=(props)=>{
    const {auth,profile}=props
    const links=auth.uid?<SignedInLinks profile={profile}/>:<SignedOutLinks/>
    return(

        <nav className="nav-wrapper light-blue lighten-2">
            
            <div className="container">
            <img src={logo} alt="Logo"  
             style={{
                
                 backgroundColor: '#fff',

             }}/>;
            
                {links}
            </div>
        </nav>
    )
}


const mapStateToProps=(state)=>{
    console.log(state);

    return {
        auth:state.firebase.auth,

        profile:state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)