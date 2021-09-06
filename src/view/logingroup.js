const segments = document.querySelector('#segments');
export const createLogin = `
<div class="cntLogin">
<img src="../imagen/banner.png" alt="port" class="borde-baner">
<div class="cntLogo">
  <img src="../imagen/logoblanco.svg" alt="logo" class="logo">
</div>
<form action="" id="login-form" class="formLogin">
  <div class="cntPasswordInput">
  <input type="email" placeholder="correo" class="login-input-log" id="login-email" required>
    <img src="../imagen/icons/ico-carta.svg" alt="port">
  </div>
  <p id="wrongemail"></p>
  <div class="cntPasswordInput">
    <input type="password" placeholder="contraseña" class="login-input-log" id="login-password" required>
    <img src="../imagen/icons/ico-candado.svg" alt="port">
  </div>
  <p id="wrongpassword"></p>
  <div class="show">
      <input type="checkbox" class="show-password" id="show-password">
      <label for="accept" >Mostrar contraseña</label>
  </div>
  <button type="button" id="login-button" class="submit-button">LOGIN</button>
</form>
<p class="oLogin">O</p>
<button type="button" id="google-login" class="google-login">
  <img src="../imagen/google.png" class="imgGoogle"/>
  Iniciar sesión con google
</button>
<p class="whiteText">¿No tienes una cuenta? <a href="#signup" id="signingup">Regístrate</a></p> 
<a href="#">Olvidé mi contraseña</a>
</div>`;
segments.innerHTML = createLogin;

export const createSignup = `
<div class="logContainer">
  <div class="cntLogo">
  <img src="../imagen/logoblanco.svg"" alt="logo" class="logo">
  </div>
  <form action="" id="signup-form">
    <input type="text" placeholder="Nombre completo" class="login-input" name="fullname" id="fullname" required>
    <p id="fullnameAlert"></p>
    <input type="text" placeholder="Nombre de usuario" class="login-input" name="username" id="username" required>
    <p id="msmUserNameValidation"></p>
    <input type="password" placeholder="Contraseña" class="login-input" name="signup-password" id="signup-password" required maxlength="15">
    <p id="msmFirstPassword"></p>
    <p id="shortPassword"></p>
    <input type="password" placeholder="Confirmar contraseña" class="login-input" name="confirm-password" id="confirm-password" required>
    <p id="msmSecondPassword"></p>
    <input type="email" placeholder="Correo" class="login-input" name="signup-email" id="signup-email" required>
    <p id="msmEmailValidation"></p>
    <p id="wrongSUemail"></p>
    <div class="termsAndConditions">
      <input type="checkbox" class="accept" name="accept" id="acceptTo">
      <label for="accept" id="textTermsAndConditions">He Leido y acepto los terminos y condiciones</label>
    </div>
    <div>
      <p id="checkBoxAlert"></p>
    </div>
    <button type="button" id="submit-button" class="submit-button">Regístrate</button>
  </form>
  <button type="button" class="cancel-button" id="cancelButton">Cancelar</button>
  <p id="sentText"></p>
  <p id="emptyText"></p>
  <p id="errorText"></p>
</div>`;

export const createHome = `
    <div class="postContentWall">
    <header class="navbar">
    <span class="textTraveler">Traveler.pe</span>
    <div class="navbarIcons">
    <div class="menuIcons">
      <a href="#home"><img src="../imagen/iconhome.png" alt=""></a>
      <a href="#newpost"><img src="../imagen/iconsubir.png" alt=""></a>
      <a href="#profile"><img src="../imagen/iconuser.svg" alt=""></a>
    </div>
    <i class="fas fa-sign-out-alt iconOut" id="logout-button"></i>
    </div>
    </header>
    <div id="allPost" class="allPost"></div>
    <div id="userslist" class="userslist"></div>
    <footer class="optionsFoot">
      <a href="#home"><img src="../imagen/home.svg" alt=""></a>
      <a href="#newpost"><img src="../imagen/subir.svg" alt=""></a>
      <a href="#profile"><img src="../imagen/user.svg" alt=""></a>
    </div>
  </footer>`;
