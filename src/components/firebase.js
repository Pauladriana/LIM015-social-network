// funcion de crear usuarios
import { emailUserRegister } from '../controller/login.js';

export const createUserFb = (signupEmail, signupPassword, usernameInput, fullnameInput,
  passwordInput, emailInput) => {
  const checkmail = () => {
    const user = firebase.auth().currentUser;
    user.sendEmailVerification().then(() => {
      // console.log('enviando correo...');
    }).catch(() => {
      // console.log(error);
    });
  };

  emailUserRegister(signupEmail, signupPassword)
    .then((userCredential) => {
      checkmail();
      userCredential.user.updateProfile({
        displayName: fullnameInput,
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/profileChange.png?alt=media&token=5030a206-bbe0-47e7-b793-2d257c0907c7',
      }).then(() => {
        const fs = firebase.firestore();
        fs.collection('users').add({
          username: usernameInput,
          fullname: fullnameInput,
          password: passwordInput,
          email: emailInput,
        })
          .then(() => {
            // console.log('Este es el nuevo usuario: ' + docRef.id);
          })
          .catch(() => {
            // console.log('Tienes el siguiente error: ' + error);
          });
      })
        .catch(() => {
          // console.log(e);
        });
      // console.log('displayName');
      // console.log('registrado');
    })
    .catch((err) => {
      const wrongSignupEmail = document.querySelector('#wrongSUemail');
      if (err.message === 'The email address is already in use by another account.') {
        wrongSignupEmail.innerHTML = 'Este correo ya esta en uso, intenta con otro';
        wrongSignupEmail.style.color = 'red';
      }
    });
};
