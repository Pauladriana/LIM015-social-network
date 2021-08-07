import {
  createLogin,
} from '../vistas/login.js';

import {
  createMuro,
} from '../vistas/muro.js';

import {
  usuariosMuro,
} from './firestore.js';

const secciones = document.querySelector('#secciones');
const signupForm = document.querySelector('#signup-form');
const botonForm = document.querySelector('#submit-button');

botonForm.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('registrandote');
  const signupEmail = document.querySelector('#signup-email').value;
  const signupPassword = document.querySelector('#signup-password').value;
  const usernameInput = document.querySelector('#username').value;
  const fullnameInput = document.querySelector('#fullname').value;
  const passwordInput = document.querySelector('#signup-password').value;
  const emailInput = document.querySelector('#signup-email').value;

  auth.createUserWithEmailAndPassword(signupEmail, signupPassword)
    .then((userCredential) => {
      console.log('registrado');
      fs.collection('users').add({
        username: usernameInput,
        fullname: fullnameInput,
        password: passwordInput,
        email: emailInput,
      }).then((docRef) => {
        console.log('Este es el nuevo usuario: ' + docRef.id);
      }).catch((error) => {
        // console.log('Tienes el siguiente error: ' + error);
      });
      signupForm.reset();
      window.history.pushState({}, 'signup', '/login');
      secciones.innerHTML = createLogin;// no deberia se asi, casi nos morimos f
    });
});

const loginForm = document.querySelector('#login-form');
const loginButon = document.querySelector('#login-button');

loginButon.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('logueandote');
  const loginEmail = document.querySelector('#login-email').value;
  const loginPassword = document.querySelector('#login-password').value;
  console.log(loginEmail, loginPassword);
  auth
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then((userCredential) => {
      console.log('logueado');
      loginForm.reset();
      window.history.pushState({}, 'login', '/muro');
      secciones.innerHTML = createMuro;
      usuariosMuro();
    });
});

const googleButton = document.querySelector('#google-login');
googleButton.addEventListener('click', (e) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log('te logueaste con google');
      loginForm.reset();
      secciones.innerHTML = createMuro;
      usuariosMuro();
    });
});
