import {crearUsuarioFb} from './firebase.js';

export const validarRegistro = () => {
	/* -----------  validar <formulario  de registro> vacios y condiciones  --------------- */
  const formularioRegistro = document.getElementById('signup-form'); //formulario
  const inputsRegistro = document.querySelectorAll('#signup-form input'); //todos los imputs del formulario

  const mensajeFullname = document.querySelector('#campoFullname'); // mensaje fullname <p>
  const mensajeUsername = document.querySelector('#campoUsername'); // mensaje username <p>
  const mensajeContraseña1 = document.querySelector('#campoContraseñaPrimero'); // mensaje contraseña 1 <p>
  const mensajeContraseña2 = document.querySelector('#campoContraseñaSegundo'); // mensaje contraseña 2 <p>
  const mensajeCorreo = document.querySelector('#campoCorreo'); // mensaje correo <p>
  const mensajeChecket = document.querySelector('#campoChecket'); // mensaje Checket <p>
  const camposVacios = document.querySelector('#camposVacios'); // mensaje de campops vacios <p>
  const textoTerminos = document.querySelector('#textoTerminos'); // texto de terminos <label>

  // expresiones regulares
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    password: /^.{6,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  }
  
  const campos = {
      fullname: false,
      username: false,
      password: false,
      email: false
  }
  
  const validarFormulario = (e) => {
    switch (e.target.name){
      case "fullname":
        if (e.target.value.length == 0) {
          mensajeFullname.innerHTML = "Este campo esta vacio";
          mensajeFullname.style.color = "red";
          campos['fullname'] = false;
        } else if (expresiones.nombre.test(e.target.value)) {
          mensajeFullname.innerHTML = "Es válido";
          mensajeFullname.style.color = "green";
          campos['fullname'] = true;
        } else {
          mensajeFullname.innerHTML = "Solo debe tener Letras";
          mensajeFullname.style.color = "red";
          campos['fullname'] = false;
        }
        break;
        case "username":
        if (e.target.value.length == 0) {
          mensajeUsername.innerHTML = "Este campo esta vacio";
          mensajeUsername.style.color = "red";
          campos['username'] = false;
        } else if (expresiones.usuario.test(e.target.value)){
          mensajeUsername.innerHTML = "Es válido";
          mensajeUsername.style.color = "green";
          campos['username'] = true;
        } else {
          mensajeUsername.innerHTML = "Maximo 16 caracteres";
          mensajeUsername.style.color = "red";
          campos['username'] = false;
        }
        break;
        case "signup-password":
        if (e.target.value.length == 0) {
          mensajeContraseña1.innerHTML = "Este campo esta vacio";
          mensajeContraseña1.style.color = "red";
        } else if(expresiones.password.test(e.target.value)){
          mensajeContraseña1.innerHTML = "Es válido";
          mensajeContraseña1.style.color = "green";
        } else {
          mensajeContraseña1.innerHTML = "La contraseña tiene que ser de 6 a 12 digitos";
          mensajeContraseña1.style.color = "red";
        }
        validarContraseña2();
        break;
        case "confirm-password":
        validarContraseña2();
        break;
        case "signup-email":
          if (e.target.value.length == 0) {
            mensajeCorreo.innerHTML = "Este campo esta vacio";
            mensajeCorreo.style.color = "red";
            //campos['email'] = false;
          } else if(expresiones.correo.test(e.target.value)){
            mensajeCorreo.innerHTML = "Es válido";
            mensajeCorreo.style.color = "green";
            campos['email'] = true;
          } else {
            mensajeCorreo.innerHTML = "El correo solo puede contener letras, numeros, puntos y guion bajo";
            mensajeCorreo.style.color = "red";
            campos['email'] = false;
          }
        break;
      }
  }

  // validar contraseña repetida
  const validarContraseña2 = () => {
  	const contraseña1 = document.querySelector('#signup-password'); // signup-password
    const contraseña2 = document.querySelector('#confirm-password'); // confirm-password

    if (contraseña1.value !== contraseña2.value) {
      mensajeContraseña2.innerHTML = "La contraseña no es la misma";
      mensajeContraseña2.style.color = "red";
      campos['password'] = false;
    } else {
      mensajeContraseña2.innerHTML = "Es válido";
      mensajeContraseña2.style.color = "green";
      campos['password'] = true;
    }
  } // ------------ 

  // validar ckecket
  const terminos = document.querySelector('#acceptTo');
  terminos.addEventListener("change", validaCheckbox, false);
  function validaCheckbox(){
    if(terminos.checked){
      mensajeChecket.style.display = "none";
    } else {
      mensajeChecket.style.display = "block";
      mensajeChecket.style.color = "red";
      mensajeChecket.innerHTML = "Acepta los terminos y condiciones";
    }
  } // --------------

  // evento keyup (cuando presionamos cualquier tecla del teclado) 
  // evenbto blur (cuando un elemento ha perdido su foco)
  inputsRegistro.forEach( (input) => {
    input.addEventListener( 'keyup', validarFormulario);
    input.addEventListener( 'blur', validarFormulario);
  });


  // registro
  const signupForm = document.querySelector("#signup-form"); // todo el formulario
  const botonForm = document.querySelector("#submit-button"); // boton "sign up"
  botonForm.addEventListener("click", (e) => {
    console.log("hizo click"); // si funciona al hacer click
      // SI LOS CAMPOS ESTAN LLENOS CORRECTAMENTE
      const terminos = document.querySelector('#acceptTo'); // checkbox
      if (campos.fullname && campos.username && campos.password && campos.email && terminos.checked) {
        console.log('ENTRA', campos.fullname, campos.username, campos.password, campos.email, terminos.checked);
        const signupEmail = document.querySelector("#signup-email").value;
        const signupPassword = document.querySelector("#signup-password").value;
        const usernameInput = document.querySelector("#username").value;
        const fullnameInput = document.querySelector("#fullname").value;
        const passwordInput = document.querySelector('#signup-password').value;
        const emailInput = document.querySelector('#signup-email').value;
        crearUsuarioFb(signupEmail, signupPassword, usernameInput, fullnameInput, passwordInput, emailInput); // funcion de crear usuarios
        signupForm.reset(); // resetea el formulario
        console.log("me resetea el formulario")
        window.location.hash = 'login'; // lleva a la ruta de login
        console.log("me regresa al login")
        // SI LOS CAMPOS NO ESTA LLENOS CORRECTAMENTE
      } else {
        console.log('NO ENTRA', campos.fullname, campos.username, campos.password, campos.email, terminos.checked);
        mensajeCamposVacios();
      }
  });

  // funcion - mensaje cuando los campos estan vacios
  const mensajeCamposVacios = () => {
    const mensajeError = document.querySelector('#campoError');
    mensajeError.innerHTML = "Error: Por favor rellena el formulario correctamente";
    mensajeError.style.color = "red";
    // mensaje de error en 1 segundo desaparece
    /*setTimeout( () => {
        mensajeError.style.display = "none";
    }, 2000);*/
  }// ----------------

} // fin funcion validarRegistro