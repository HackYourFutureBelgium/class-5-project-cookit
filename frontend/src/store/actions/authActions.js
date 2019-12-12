
export const logIn = (information) => {
  return (dispatch, getState, { getFirebase }) => {

    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      information.email,
      information.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' });
    });
  }
}

export const signUp = (userNew) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      userNew.email,
      userNew.password
    ).then((res) => {
      return firestore.collection('cookit-users').doc(res.user.uid).set({
        firstName: userNew.firstName,
        lastName: userNew.lastName,
        monogram: userNew.firstName[0] + userNew.lastName[0]
      })
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err });
    });
  }
}
