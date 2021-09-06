import { createUserFb } from './firebase.js';

export const registerValidation = () => {
  /* -----------  validar <formulario  de registro> vacios y condiciones  --------------- */
  const registrationInput = document.querySelectorAll('#signup-form input');
  const fullnameAlert = document.querySelector('#fullnameAlert'); // mensaje fullname <p>
  const usernameAlert = document.querySelector('#msmUserNameValidation'); // mensaje username <p>
  const firtsPasswordAlert = document.querySelector('#msmFirstPassword'); // mensaje contraseña 1 <p>
  const secondPasswordAlert = document.querySelector('#msmSecondPassword'); // mensaje contraseña 2 <p>
  const emailAlert = document.querySelector('#msmEmailValidation'); // mensaje correo <p>
  const checkBoxAlert = document.querySelector('#checkBoxAlert'); // mensaje Checket <p>

  // restriciones para inputs de registro
  const restrictions = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    user: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    password: /^.{6,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  };

  const validationInputs = {
    fullname: false,
    username: false,
    password: false,
    email: false,
  };

  // validar contraseña repetida
  const secondPasswordValidation = () => {
    const firstPassword = document.querySelector('#signup-password');
    const secondPassword = document.querySelector('#confirm-password');

    if (firstPassword.value !== secondPassword.value) {
      secondPasswordAlert.innerHTML = 'La contraseña no es la misma';
      secondPasswordAlert.style.color = '#ffccdd';
      validationInputs.password = false;
    } else {
      secondPasswordAlert.innerHTML = 'Es válido';
      secondPasswordAlert.style.color = '#c8fdc8';
      validationInputs.password = true;
    }
  };

  const formValidation = (e) => {
    switch (e.target.name) {
      case 'fullname':
        if (e.target.value.length === 0) {
          fullnameAlert.innerHTML = 'Este campo esta vacio';
          fullnameAlert.style.color = '#ffccdd';
          validationInputs.fullname = false;
        } else if (restrictions.name.test(e.target.value)) {
          fullnameAlert.innerHTML = 'Es válido';
          usernameAlert.style.color = '#c8fdc8';
          validationInputs.fullname = true;
        } else {
          fullnameAlert.innerHTML = 'Solo debe tener Letras';
          fullnameAlert.style.color = '#ffccdd';
          validationInputs.fullname = false;
        }
        break;
      case 'username':
        if (e.target.value.length === 0) {
          usernameAlert.innerHTML = 'Este campo esta vacio';
          usernameAlert.style.color = '#ffccdd';
          validationInputs.username = false;
        } else if (restrictions.user.test(e.target.value)) {
          usernameAlert.innerHTML = 'Es válido';
          usernameAlert.style.color = '#c8fdc8';
          validationInputs.username = true;
        } else {
          usernameAlert.innerHTML = 'Maximo 16 caracteres';
          usernameAlert.style.color = '#ffccdd';
          validationInputs.username = false;
        }
        break;
      case 'signup-password':
        if (e.target.value.length === 0) {
          firtsPasswordAlert.innerHTML = 'Este campo esta vacio';
          firtsPasswordAlert.style.color = '#ffccdd';
        } else if (restrictions.password.test(e.target.value)) {
          firtsPasswordAlert.innerHTML = 'Es válido';
          firtsPasswordAlert.style.color = '#c8fdc8';
        } else {
          firtsPasswordAlert.innerHTML = 'La contraseña tiene que ser de 6 a 12 digitos';
          firtsPasswordAlert.style.color = '#ffccdd';
        }
        secondPasswordValidation();
        break;
      case 'confirm-password':
        secondPasswordValidation();
        break;
      case 'signup-email':
        if (e.target.value.length === 0) {
          emailAlert.innerHTML = 'Este campo esta vacio';
          emailAlert.style.color = '#ffccdd';
        } else if (restrictions.email.test(e.target.value)) {
          emailAlert.innerHTML = 'Es válido';
          emailAlert.style.color = '#c8fdc8';
          validationInputs.email = true;
        } else {
          emailAlert.innerHTML = 'El correo solo puede contener letras, numeros, puntos y guion bajo';
          emailAlert.style.color = '#ffccdd';
          validationInputs.email = false;
        }
        break;
      default:
        emailAlert.innerHTML = '';
        break;
    }
  };

  // validar ckecket
  const termsAndConditions = document.querySelector('#acceptTo');
  function validaCheckbox() {
    if (termsAndConditions.checked) {
      checkBoxAlert.style.display = 'none';
    } else {
      checkBoxAlert.style.display = 'block';
      checkBoxAlert.style.color = '#ffccdd';
      checkBoxAlert.innerHTML = 'Acepta los terminos y condiciones';
    }
  }
  termsAndConditions.addEventListener('change', validaCheckbox, false);
  registrationInput.forEach((input) => {
    input.addEventListener('keyup', formValidation);
    input.addEventListener('blur', formValidation);
  });

  const emptyInputsAlert = () => {
    const mensajeError = document.querySelector('#errorText');
    mensajeError.innerHTML = 'Error: Por favor rellena el formulario correctamente';
    mensajeError.style.color = '#ffccdd';
  };

  // registro
  const signupForm = document.querySelector('#signup-form');
  const botonForm = document.querySelector('#submit-button');
  botonForm.addEventListener('click', () => {
    if (validationInputs.fullname && validationInputs.username && validationInputs.password
        && validationInputs.email && termsAndConditions.checked) {
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
      emptyInputsAlert();
    }
  });
};

export const cancelRegistration = () => {
  const cancelButton = document.querySelector('#cancelButton');
  cancelButton.addEventListener('click', () => {
    window.location.hash = 'login';
    // showSeccion();
  });
}; // ---------------
