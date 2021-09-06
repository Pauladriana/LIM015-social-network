import { validateEmail } from './loginValidations.js';
import { loginWithEmail, googleRegister } from '../controller/login.js';

// evento click - logearse con correo y contraseña
export const loginClick = () => {
  const loginButton = document.querySelector('#login-button');
  // const loginForm = document.querySelector('#login-form');
  loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log('logueandote');
    const loginEmail = document.querySelector('#login-email').value;
    const loginPassword = document.querySelector('#login-password').value;
    // console.log(loginEmail, loginPassword);

    loginWithEmail(loginEmail, loginPassword)
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          // verifica el correo si es true
          if (user.emailVerified) {
            // console.log('logueo exitoso', user);
            localStorage.setItem('user', JSON.stringify(user.providerData[0]));
            window.location.hash = 'home';
            // console.log('*****************');
            // console.log(user.emailVerified);
            // console.log('*****************');
          } else {
            const errorVerified = document.querySelector('#wrongpassword');
            errorVerified.innerHTML = 'tu correo no esta verificado';
            errorVerified.style.color = 'red';
          }
        });
      })
      .catch((err) => {
        const wrongLoginPassword = document.querySelector('#wrongpassword');
        const wrongLoginEmail = document.querySelector('#wrongemail');
        if (
          err.message
          === 'The password is invalid or the user does not have a password.'
        ) {
          wrongLoginPassword.innerHTML = 'La contraseña es incorrecta';
          wrongLoginPassword.style.color = 'red';
        }
        if (
          err.message
          === 'There is no user record corresponding to this identifier. The user may have been deleted.'
        ) {
          wrongLoginEmail.innerHTML = 'Este correo no es valido, por favor corrigelo';
          wrongLoginEmail.style.color = 'red';
        }
      });
  });
};

// Logearse con google
export const googleRegistration = () => {
  const auth = firebase.auth();
  const googleButton = document.querySelector('#google-login');
  googleButton.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log(firebase.auth().currentUser);
    // Si hay sesion activa , desloguea antes de loguear
    // nuevamente, sino sigue el flujo normal de login con google
    if (firebase.auth().currentUser) {
      auth.signOut().then(() => {
        // console.log('DESLOGUEANDO');
        googleRegister().then(() => {
          if (firebase.auth().currentUser) {
            const user = firebase.auth().currentUser.providerData[0];
            // console.log('te logueaste con google', firebase.auth().currentUser.providerData[0]);
            validateEmail(user);
            // console.log(user);
          }
        });
      });
    } else {
      googleRegister().then(() => {
        if (firebase.auth().currentUser) {
          const user = firebase.auth().currentUser.providerData[0];
          // console.log('te logueaste con google', firebase.auth().currentUser.providerData[0]);
          validateEmail(user);
        }
      });
    }
  });
  // Termina login google con firebase
}; // ----------

// boton 'cancel'
