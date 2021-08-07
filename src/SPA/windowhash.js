import {
  createSignup,
} from '../vistas/signup.js';

import {
  createMuro,
} from '../vistas/muro.js';

import {
  usuariosMuro,
} from '../firebase/firestore.js';

import {
  createLogin,
} from '../vistas/login.js';


const cancelando = () => {
  const cancelsignup = document.querySelector('#cancelar');
  cancelsignup.addEventListener('click', () => {
    console.log('algo');
  });
};

// ENROUTAMIENTO
const secciones = document.querySelector('#secciones');

// EVITANDO 404
// console.log(window.location.pathname);
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
    // AGREGAR LO DE AUTH(LOGIN)
  } else if (window.location.hash === '#login') {
    // SOLO SI SE COMPLETO EL REGISTRO PODER IR AL LOGIN (EN EL BOTON SIGN UP)
    // SI HAGO CLICK EN SIGN UP Y SE HA COMPLETADO EL REGISTRO MOSTRARME LOGIN
    /*if (newRegister) {
      secciones.innerHTML = createLogin;
    } else if (cancelando) {
      secciones.innerHTML = createLogin;
    }*/
    changeRoute(window.location.hash);
  } else if (window.location.hash === '#muro') {
    changeRoute(window.location.hash);
    // CONDICIONAL PARA QUE INGRESE SOLO SI SE HA LOGUEADO
    secciones.innerHTML = createMuro;// CAMBIAR?
  }
});
// FLECHAS DE ATRAS Y ADELANTE ------> NO FUNCIONA!
/* window.onpopstate( () => {
    if(window.location.pathname === '/login'){
      secciones.innerHTML = createLogin;
      console.log(' LOGIN')
    } else if (window.location.pathname === '/signup') {
      secciones.innerHTML = createSignup;
      console.log(' REGISTRO')
    }
  }); */