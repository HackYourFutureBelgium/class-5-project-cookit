// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './component/App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import firebaseConfig from './config/firebaseConfig';


const store = createStore(
  rootReducer,

  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig, {
      attachAuthIsReady: true, useFirestoreForProfile: true,
      userProfile: 'cookit-users'
    })

  )
);


store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
})

serviceWorker.unregister();




