import {createLogin} from './logingroup.js';

// funcion de cerrar sesion cuando este logeado
export const cerrarSesion = () => {
  const logout = document.querySelector("#logout-button");
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      console.log("cerraste sesion");
      window.location.hash = 'login';
      console.log("regreso al login")
    });
  });
}
