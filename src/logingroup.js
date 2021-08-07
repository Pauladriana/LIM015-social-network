import {
  createLogin,
} from './vistas/login.js';

const secciones = document.querySelector('#secciones');

// CREANDO DINAMICAMENTE EL VISTA LOGIN
secciones.innerHTML = createLogin;
