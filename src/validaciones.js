import { createUserFb } from './firebase.js';

export const validarRegistro = () => {
  /* -----------  validar <formulario  de registro> vacios y condiciones  --------------- */
  const inputsRegistro = document.querySelectorAll('#signup-form input');
  const mensajeFullname = document.querySelector('#campoFullname'); // mensaje fullname <p>
  const mensajeUsername = document.querySelector('#msmUserNameValidation'); // mensaje username <p>
  const mensajeContraseña1 = document.querySelector('#msmFirstPassword'); // mensaje contraseña 1 <p>
  const mensajeContraseña2 = document.querySelector('#msmSecondPassword'); // mensaje contraseña 2 <p>
  const mensajeCorreo = document.querySelector('#msmEmailValidation'); // mensaje correo <p>
  const mensajeChecket = document.querySelector('#boxCheck'); // mensaje Checket <p>

  // expresiones regulares
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    password: /^.{6,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  };

  const campos = {
    fullname: false,
    username: false,
    password: false,
    email: false,
  };

  // validar contraseña repetida
  const validarContraseña2 = () => {
    const contraseña1 = document.querySelector('#signup-password');
    const contraseña2 = document.querySelector('#confirm-password');

    if (contraseña1.value !== contraseña2.value) {
      mensajeContraseña2.innerHTML = 'La contraseña no es la misma';
      mensajeContraseña2.style.color = '#ffccdd';
      campos.password = false;
    } else {
      mensajeContraseña2.innerHTML = 'Es válido';
      mensajeContraseña2.style.color = '#c8fdc8';
      campos.password = true;
    }
  };

  const validarFormulario = (e) => {
    switch (e.target.name) {
      case 'fullname':
        if (e.target.value.length === 0) {
          mensajeFullname.innerHTML = 'Este campo esta vacio';
          mensajeFullname.style.color = '#ffccdd';
          campos.fullname = false;
        } else if (expresiones.nombre.test(e.target.value)) {
          mensajeFullname.innerHTML = 'Es válido';
          mensajeUsername.style.color = '#c8fdc8';
          campos.fullname = true;
        } else {
          mensajeFullname.innerHTML = 'Solo debe tener Letras';
          mensajeFullname.style.color = '#ffccdd';
          campos.fullname = false;
        }
        break;
      case 'username':
        if (e.target.value.length === 0) {
          mensajeUsername.innerHTML = 'Este campo esta vacio';
          mensajeUsername.style.color = '#ffccdd';
          campos.username = false;
        } else if (expresiones.usuario.test(e.target.value)) {
          mensajeUsername.innerHTML = 'Es válido';
          mensajeUsername.style.color = '#c8fdc8';
          campos.username = true;
        } else {
          mensajeUsername.innerHTML = 'Maximo 16 caracteres';
          mensajeUsername.style.color = '#ffccdd';
          campos.username = false;
        }
        break;
      case 'signup-password':
        if (e.target.value.length === 0) {
          mensajeContraseña1.innerHTML = 'Este campo esta vacio';
          mensajeContraseña1.style.color = '#ffccdd';
        } else if (expresiones.password.test(e.target.value)) {
          mensajeContraseña1.innerHTML = 'Es válido';
          mensajeContraseña1.style.color = '#c8fdc8';
        } else {
          mensajeContraseña1.innerHTML = 'La contraseña tiene que ser de 6 a 12 digitos';
          mensajeContraseña1.style.color = '#ffccdd';
        }
        validarContraseña2();
        break;
      case 'confirm-password':
        validarContraseña2();
        break;
      case 'signup-email':
        if (e.target.value.length === 0) {
          mensajeCorreo.innerHTML = 'Este campo esta vacio';
          mensajeCorreo.style.color = '#ffccdd';
        } else if (expresiones.correo.test(e.target.value)) {
          mensajeCorreo.innerHTML = 'Es válido';
          mensajeCorreo.style.color = '#c8fdc8';
          campos.email = true;
        } else {
          mensajeCorreo.innerHTML = 'El correo solo puede contener letras, numeros, puntos y guion bajo';
          mensajeCorreo.style.color = '#ffccdd';
          campos.email = false;
        }
        break;
      default:
        mensajeCorreo.innerHTML = '';
        break;
    }
  };

  // validar ckecket
  const terminos = document.querySelector('#acceptTo');
  function validaCheckbox() {
    if (terminos.checked) {
      mensajeChecket.style.display = 'none';
    } else {
      mensajeChecket.style.display = 'block';
      mensajeChecket.style.color = '#ffccdd';
      mensajeChecket.innerHTML = 'Acepta los terminos y condiciones';
    }
  }
  terminos.addEventListener('change', validaCheckbox, false);
  inputsRegistro.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
  });

  const mensajeCamposVacios = () => {
    const mensajeError = document.querySelector('#errorText');
    mensajeError.innerHTML = 'Error: Por favor rellena el formulario correctamente';
    mensajeError.style.color = '#ffccdd';
  };

  // registro
  const signupForm = document.querySelector('#signup-form');
  const botonForm = document.querySelector('#submit-button');
  botonForm.addEventListener('click', () => {
    if (campos.fullname && campos.username && campos.password && campos.email && terminos.checked) {
      const signupEmail = document.querySelector('#signup-email').value;
      const signupPassword = document.querySelector('#signup-password').value;
      const usernameInput = document.querySelector('#username').value;
      const fullnameInput = document.querySelector('#fullname').value;
      const passwordInput = document.querySelector('#signup-password').value;
      const emailInput = document.querySelector('#signup-email').value;
      createUserFb(signupEmail, signupPassword, usernameInput, fullnameInput,
        passwordInput, emailInput);
      signupForm.reset();
      window.location.hash = 'login';
    } else {
      mensajeCamposVacios();
    }
  });
};
