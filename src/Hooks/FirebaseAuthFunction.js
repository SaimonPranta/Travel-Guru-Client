import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import firebaseConfig from "../ConfigFIles/FireAuthConfig";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(app);
const facebookProvider = new FacebookAuthProvider(app);
const user = auth.currentUser;
export const currentUser = () => {
  if (user) {
    return user
  }
}

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider)
    .then((result) => {
      return result
    })
    .catch((error) => {
      return error;
    });
}
export const loginWithFaceBook = () => {
  return signInWithPopup(auth, facebookProvider)
    .then((result) => {
      console.log(result)
      return result
    })
    .catch((error) => {
      console.log(error)
      return error
    })
}
export const singUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return error
    });
}
export const singIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage
    });
}
export const resetPassword = (email) => {

  return sendPasswordResetEmail(auth, email)
    .then(() => {
      return "sucess"
    })
    .catch((error) => {
      return error
    });
}
export const verifyAuthToken = () => {
  // firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
  getAuth(app).currentUser.getIdToken(/* forceRefresh */ true)
  .then(function(idToken) {
    localStorage.setItem( "idToken", idToken)
  }).catch(function(error) {
    console.log(error)
  });
}
export const logOut = () => {
  deleteUser(user)
  .then(() => {
  })
  .catch((error) => {
   
  });
}