// funcion de crear usuarios
import { emailUserRegister } from './login.js';

export const crearUsuarioFb = (signupEmail, signupPassword, usernameInput, fullnameInput,
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
        photoURL: './imagen/profileChange.png',
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
