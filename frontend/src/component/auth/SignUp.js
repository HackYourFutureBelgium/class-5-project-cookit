import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {signUp} from '../../store/actions/authActions';
import Modal from 'react-awesome-modal';
import './signin.css'


class SignUp extends Component {

  constructor() {
    super();

    this. state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      visible : true,
      isSignedIn: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    };

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
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.signUp(this.state);
  }
  render() {
    const {auth,authError}=this.props;
    console.log(authError);

    if(auth.uid) return <Redirect to='/' />
  return (
<Modal 
    visible={this.state.visible}
    effect="fadeInUp"
    onClickAway={() => this.closeModal() }
>
     <div className="container" >
     <form className="white" onSubmit={this.handleSubmit} style={{width:'350px' ,height:'450px', marginLeft:'1em'}}>
                <h3 className="center">Sign Up</h3>

                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" placeholder="Enter email" id='email' onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" id='password' onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>First Name</label>
                    <input type="firstName" className="form-control" placeholder="Enter first name" id='firstName' onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="lastName" className="form-control" placeholder="Enter last name" id='lastName' onChange={this.handleChange}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <div className="red-text center">
           
              {authError ? <p>{authError}</p>: null}
            </div>
            <p className="extra text-center">
            Already Have an Account? <a href="./signin">Sign In</a>
                </p>
            </form>
      </div>
      </Modal>
)
}
}


const mapDispatchToProps=(dispatch)=>{
  return {
    signUp:(creds)=>dispatch(signUp(creds))
  }
}

const mapStateToProps=(state)=>{
  return {
    auth:state.firebase.auth,
    authError:state.auth.authError
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp)