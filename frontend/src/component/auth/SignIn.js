import React,{Component} from 'react';
import {connect} from 'react-redux';
import {logIn} from '../../store/actions/authActions';
import {Redirect} from 'react-router-dom';
import Modal from 'react-awesome-modal';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import './signin.css'


firebase.initializeApp({
  apiKey: "AIzaSyCHCw0nHjUwds38zc9k8rPdkF4UPVzl4DU",
  authDomain: "hyf-cookit.firebaseapp.com",
  databaseURL: "https://hyf-cookit.firebaseio.com",
  projectId: "hyf-cookit",
  storageBucket: "hyf-cookit.appspot.com",
  messagingSenderId: "1012416650526",
  appId: "1:1012416650526:web:f8d0ea5cc159cb61c0fd0f",
  measurementId: "G-THV5DHRPTL"
})


class SignIn extends Component { 
  
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      visible : true,
      isSignedIn: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    };

    uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }
  
    componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user })
        console.log("user", user)
      })
    }
    openModal() {
      this.setState({
          visible : true
      });
  }

  closeModal() {
      this.setState({
          visible : false, 

      });this.props.history.push('/')
  }
  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  } 

  handleSubmit(e) {
    e.preventDefault();
    this.props.signIn(this.state);
  } 
  render() {
    const {authError,auth}=this.props;
    if(auth.uid) return <Redirect to='/' />
  return (
    <Modal 
    visible={this.state.visible}
    effect="fadeInUp"
    onClickAway={() => this.closeModal() }
>
     <div className="container" >
     <form className="white" onSubmit={this.handleSubmit} style={{width:'350px' ,height:'450px', marginLeft:'1em'}}>
                <h3 className="center">Sign In</h3>

                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" placeholder="Enter email" id='email' onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" id='password' onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <div className="red-text center">
           
              {authError ? <p>{authError}</p>: null}
            </div>
                <form className="login-form" method="POST">
               <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          /> 
            </form>
            <p className="extra text-center">
                    Forgot <a href="#">password?</a>&emsp;&emsp;
            Create New Account <a href="./signup">Sign Up</a>
                </p>
            </form>
      </div>
      </Modal>
  )
}
}

const mapDispatchToProps=(dispatch)=>{
  return{
    signIn:(info)=>dispatch(logIn(info))
  }
}

const mapStateToProps=(state)=>{
  return {
    authError:state.auth.authError,

    auth:state.firebase.auth
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn)




