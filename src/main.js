
import {crearUsuarioFb} from './firebase.js';
import {validarRegistro, camposLlenos, campos} from './validaciones.js';
import {changeRoute, cambioRuta} from './hashView.js';


window.addEventListener('hashchange', () => {
    if (window.location.hash === '#signup') {
    console.log('mostrar registro');
    changeRoute(window.location.hash);
    cambioRuta();
    //PROCESO DE REGISTRO:
    const signupForm = document.querySelector("#signup-form");
    const botonForm = document.querySelector("#submit-button");
    validarRegistro(campos);

    const cancelSignup = document.querySelector('#cancel-button');
    cancelSignup.addEventListener('click', () => {
      window.location.pathname = '#login'
    })

    botonForm.addEventListener("click", (e) => {
      e.preventDefault();
      
      console.log("registrandote");
      const signupEmail = document.querySelector("#signup-email").value;
      const signupPassword = document.querySelector("#signup-password").value;
      const usernameInput = document.querySelector("#username").value;
      const fullnameInput = document.querySelector("#fullname").value;
      const passwordInput = document.querySelector('#signup-password').value;
      const emailInput = document.querySelector('#signup-email').value;

      crearUsuarioFb(signupEmail, signupPassword, usernameInput, fullnameInput, passwordInput, emailInput);
      
      console.log('cambiar pantalla');
      camposLlenos(campos);
      if (camposLlenos(campos)) {
        window.location.pathname = '#login'
      };
      
      
    });
  } // termina el if
    
}); // termina el evento hashchange 



//FLECHAS DE ATRAS Y ADELANTE ------> NO FUNCIONA!
/*window.addEventListener('popstate', (event) => {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
  
  console.log('POPOPOPOPOP');
  if(window.location.pathname === '/login'){
    secciones.innerHTML = createLogin;
    console.log(' LOGIN')
  } else if (window.location.pathname === '/signup'){
    secciones.innerHTML = createSignup;
    console.log(' REGISTRO')
  }  
});*/


window.addEventListener('load', () => {
  if (window.location.hash === '#login') {
    console.log('mostrar login');
    changeRoute(window.location.hash);
    cambioRuta();
//Login con email y contraseña:
const loginForm = document.querySelector("#login-form");
const loginButon = document.querySelector('#login-button');
const showPassword = document.querySelector('#show-password');
showPassword.addEventListener('change', () => {
  const password1 = document.querySelector('#login-password');
    if ( password1.type === "text" ) {
        password1.type = "password"
    } else {
        password1.type = "text"
    }
  });
loginButon.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("logueandote");
  const loginEmail = document.querySelector("#login-email").value;
  const loginPassword = document.querySelector("#login-password").value;
  console.log(loginEmail, loginPassword);

  auth
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then((userCredential) => {
      console.log("logueado");
      loginForm.reset();
      window.location.hash = 'muro'
      cambioRuta();
    }) // fin then
    .catch((err) => {
      const wrongLoginPassword = document.querySelector('#wrongpassword');
      const wrongLoginEmail = document.querySelector('#wrongemail');
      if (err.message == 'The password is invalid or the user does not have a password.'){
        wrongLoginPassword.innerHTML = 'La contraseña es incorrecta';
        wrongLoginPassword.style.color = 'red'
      }
      if (err.message == 'There is no user record corresponding to this identifier. The user may have been deleted.'){
        wrongLoginEmail.innerHTML = 'Este correo no es valido, por favor corrigelo';
        wrongLoginEmail.style.color = 'red'
      }
    })
  //Termina login con firebase
});

//Logearse con google
const googleButton = document.querySelector("#google-login");
googleButton.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log("te logueaste con google");
      loginForm.reset();
      window.location.hash = 'muro'
      cambioRuta();
    })
    .catch((err) => {
      console.log(err);
    })
  //Termina login google con firebase

});
};
});

window.addEventListener('hashchange', () => {

    if (window.location.hash === '#muro') {
    console.log('mostrar muro');
    changeRoute(window.location.hash);
    cambioRuta();
    //MOSTRAR USUARIOS LOGUEADOS
    //MOSTRAR CERRAR SESION
    
  } // termina el if
    
});