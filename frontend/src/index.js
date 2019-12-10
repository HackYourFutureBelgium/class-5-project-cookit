import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware,compose} from 'redux';
import {reduxFirestore,getFirestore} from 'redux-firestore';
import {reactReduxFirebase,getFirebase} from 'react-redux-firebase';
import rootReducer from './store/reducers/rootReducer';
import {Provider} from 'react-redux';
import firebaseConfig from './config/firebaseConfig';
import './index.css';


const store=createStore(
    rootReducer,
  
    compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig,{attachAuthIsReady:true,useFirestoreForProfile:true,
        userProfile:'cookit-users'})
    
    )
  );


  store.firebaseAuthIsReady.then(()=>{
      ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
  })

  serviceWorker.unregister();



