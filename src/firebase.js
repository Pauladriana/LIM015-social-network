// funcion de crear usuarios
import {emailUserRegister} from './login.js';

export const crearUsuarioFb = (signupEmail, signupPassword, usernameInput, fullnameInput, passwordInput, emailInput) => {
  emailUserRegister(signupEmail, signupPassword)
    .then((userCredential) => {
      checkmail();
      userCredential.user.updateProfile({
        displayName: fullnameInput,
        photoURL: './imagen/user.svg'
      }).then((r) => {
        console.log(r);
      })
      .catch((e)=>{
        console.log(e);
      });
      console.log(displayName);
      // console.log("registrado");
      fs.collection("users").add({
        username: usernameInput,
        fullname: fullnameInput,
        password: passwordInput,
        email: emailInput
      })
        .then((docRef) => {
        // console.log("Este es el nuevo usuario: " + docRef.id);
        })
        .catch((error) => {
          // console.log("Tienes el siguiente error: " + error);
        });
    })
    .catch((err) => {
      const wrongSignupEmail = document.querySelector('#wrongSUemail');
      if (err.message === 'The email address is already in use by another account.') {
        wrongSignupEmail.innerHTML = 'Este correo ya esta en uso, intenta con otro';
        wrongSignupEmail.style.color = 'red';
      }
    });

    // verificar el correo electronico
      const checkmail = () => {
        const user = firebase.auth().currentUser; 
        user.sendEmailVerification().then(function() {
          // email
          console.log('enviando correo...');
        }).catch(function(error) {
          // error
          console.log(error);
        });
      }
};
