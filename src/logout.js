import {createLogin} from './logingroup.js';

export const cerrarSesion = () => {
  const logout = document.querySelector("#logout-button");
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      console.log("cerraste sesion");
      window.location.hash = '#login';
      showSeccion();
      console.log("regreso al login")
      //secciones.innerHTML = createLogin;
    });
  });
}
