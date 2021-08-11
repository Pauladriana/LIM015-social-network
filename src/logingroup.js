const secciones = document.querySelector('#secciones');

// creando dinamicamente la vista login (href = muro)
export const createLogin = `
<img src="./imagen/banner.png" alt="port" class="borde-baner">
<div class="cntLogo">
  <img src="./imagen/logo.svg" alt="logo" class="logo">
</div>
<form action="" id="login-form" class="formLogin">
  <div class="cntPasswordInput">
  <input type="email" placeholder="correo" class="login-input-log" id="login-email" required>
    <img src="./imagen/icons/ico-carta.svg" alt="port">
  </div>
  <p id="wrongemail"></p>
  <div class="cntPasswordInput">
    <input type="password" placeholder="contraseña" class="login-input-log" id="login-password" required>
    <img src="./imagen/icons/ico-candado.svg" alt="port">
  </div>
  <p id="wrongpassword"></p>
  <div class="mostrar">
      <input type="checkbox" class="show-password" id="show-password">
      <label for="accept" >Mostrar contraseña</label>
  </div>
  <button type="button" id="login-button" class="submit-button">LOGIN</button>
</form>
<p>O</p>
<button type="button" id="google-login" class="google-login">
  <img src="./imagen/google.png" class="imgGoogle"/>
  Iniciar sesión con google
</button>
<p>¿No tienes una cuenta? <a href="#signup" id="signingup">Regístrate</a></p> 
<a href="#">Olvidé mi contraseña</a>`;
secciones.innerHTML = createLogin;

// creando dinamicamente la vista registro (href = login)
export const createSignup = `
<div class="contenedor-registro">
  <h1 class="titulo" >Viaja conmigo</h1>
  <div class="cntLogo">
  <img src="./imagen/logo.svg" alt="logo" class="logo2">
  </div>
  <form action="" id="signup-form">
    <input type="text" placeholder="Nombre completo" class="login-input" name="fullname" id="fullname" required>
    <p id="campoFullname"></p>
    <input type="text" placeholder="Nombre de usuario" class="login-input" name="username" id="username" required>
    <p id="campoUsername"></p>
    <input type="password" placeholder="Contraseña" class="login-input" name="signup-password" id="signup-password" required maxlength="15">
    <p id="campoContraseñaPrimero"></p>
    <p id="shortPassword"></p>
    <input type="password" placeholder="Confirmar contraseña" class="login-input" name="confirm-password" id="confirm-password" required>
    <p id="campoContraseñaSegundo"></p>
    <input type="email" placeholder="Correo" class="login-input" name="signup-email" id="signup-email" required>
    <p id="campoCorreo"></p>
    <p id="wrongSUemail"></p>
    <div class="terminos">
      <input type="checkbox" class="accept" name="accept" id="accept">
      <label for="accept" id="textoTerminos">He Leido y acepto los terminos y condiciones</label>
    </div>
    <div>
      <p id="campoChecket"></p>
    </div>
    <button type="button" id="submit-button" class="submit-button">Regístrate</button>
  </form>
  <button class="cancel-button" id="cancel-button">Cancelar</button>
  <p id="campoEnviado"></p>
  <p id="camposVacios"></p>
  <p id="campoError"></p>
</div>`;

// creando dinamicamente la vista muro (href = login)
export const createMuro = `
    <p>LOGRASTE INGRESAR: BIENVENIDO A TRAVELER.PE</p>
    <p>Estos son los traveleros:</p>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <ul class="list-group" id="userslist">
            
          </ul>

        </div>
      </div>
    </div>
    <button class="logout-button" type="button" id="logout-button">LOGOUT</button>`;


      // icono para mostrar contraseña
      const showPassword = document.querySelector('#show-password');
      showPassword.addEventListener('change', () => {
        const password1 = document.querySelector('#login-password');
          if ( password1.type === "text" ) {
              password1.type = "password"
          } else {
              password1.type = "text"
          }
      });
