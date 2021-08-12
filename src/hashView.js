import {createLogin, createSignup, createMuro} from './logingroup.js';
import {showAuthUsers} from './authuser.js';



const secciones = document.querySelector('#secciones');

//RUTA SIN #
export const changeRoute = (hash) => {
  if (hash === '#login'){
    window.history.replaceState({}, 'login', '/login')
  } else if (hash === '#signup'){
    window.history.replaceState({}, 'signup', '/signup')
  } else if (hash === '#muro'){
    window.history.replaceState({}, 'muro', '/muro')
  }
  
};

//EVITANDO 404 - funcion cambioRuta
export const cambioRuta = () => {
    console.log(window.location.pathname);
    if(window.location.pathname === '/login'){
      console.log('mostrar login');
      secciones.innerHTML = createLogin;
    } else if (window.location.pathname === '/signup'){
      console.log('mostrar registro');
      secciones.innerHTML = createSignup;
    } else if (window.location.pathname === '/muro'){
      console.log('mostrar muro');
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          secciones.innerHTML = createMuro;
          showAuthUsers();
          const logout = document.querySelector("#logout-button");
          logout.addEventListener("click", (e) => {
          e.preventDefault();
          auth.signOut().then(() => {
            console.log("cerraste sesion");
            window.location.pathname = '#login'
      });
    });
        } /*else if (!user) {
          console.log('regresando');
          window.history.pushState( {} , 'muro', '/login' );
          cambioRuta();
        }*/
      });
      
    }
}
