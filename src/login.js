
export const loginWithEmail = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password)
};
export const googleRegister = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider)
};

//REGISTRO
export const emailUserRegister = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password)
}