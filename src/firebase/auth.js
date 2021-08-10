import {
  createLogin,
} from '../vistas/login.js';

const secciones = document.querySelector('#secciones');

export const newlogin = () => {
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
          //console.log('Este es el nuevo usuario: ' + docRef.id);
        }).catch((error) => {
          //console.log('Tienes el siguiente error: ' + error);
        });
        signupForm.reset();
        window.history.pushState({}, 'signup', '/login');
        secciones.innerHTML = createLogin;// no deberia se asi, casi nos morimos f
      });
  });
};
