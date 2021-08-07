import {
  createLogin, createSignup, createMuro, usuariosMuro,
} from './logingroup.js';//ARREGLAR

// ENROUTAMIENTO
const secciones = document.querySelector('#secciones');

// EVITANDO 404
console.log(window.location.pathname);
if (window.location.pathname === '/login') {
  secciones.innerHTML = createLogin;
} else if (window.location.pathname === '/signup') {
  secciones.innerHTML = createSignup;
} else if (window.location.pathname === '/muro') {
  secciones.innerHTML = createMuro;
  usuariosMuro();
}

// RUTA SIN #
const changeRoute = (hash) => {
  if (hash === '#login') {
    window.history.replaceState({}, 'login', '/login');
  } else if (hash === '#signup') {
    window.history.replaceState({}, 'signup', '/signup');
  } else if (hash === '#muro') {
    window.history.replaceState({}, 'muro', '/muro');
  }
};

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#signup') {
    console.log('mostrar registro');
    secciones.innerHTML = createSignup;
    changeRoute(window.location.hash);
    //AGREGAR LO DE AUTH(LOGIN)
  } else if (window.location.hash === '#login') {
    console.log('mostrar login');
    secciones.innerHTML = createLogin;//CAMBIAR
    changeRoute(window.location.hash);
  } else if (window.location.hash === '#muro') {
    changeRoute(window.location.hash);
    secciones.innerHTML = createMuro;//CAMBIAR?
  }
});

// FLECHAS DE ATRAS Y ADELANTE ------> NO FUNCIONA!
/* window.onpopstate( () => {
  if(window.location.pathname === '/login'){
    secciones.innerHTML = createLogin;
    console.log(' LOGIN')
  } else if (window.location.pathname === '/signup'){
    secciones.innerHTML = createSignup;
    console.log(' REGISTRO')
  }
}); */

// LOGIN- LOGEARSE
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

// LOGUEARSE CON GOOGLE
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
