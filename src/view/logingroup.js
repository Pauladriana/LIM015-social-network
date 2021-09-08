const segments = document.querySelector('#segments');
export const createLogin = `
<div class="cntLogin">
<img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/banner.png?alt=media&token=c67e9023-eee2-4d6f-8362-fc9be84bab8e" alt="port" class="borde-baner">
<div class="cntLogo">
  <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/logoblanco.svg?alt=media&token=64fe185b-42c6-4532-9176-83c181b1d993" alt="logo" class="logo">
</div>
<form action="" id="login-form" class="formLogin">
  <div class="cntPasswordInput">
  <input type="email" placeholder="correo" class="login-input-log" id="login-email" required>
    <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/icons%2Fico-carta.svg?alt=media&token=fb9a7082-e3ec-4079-87cf-6bf37dbedab7" alt="port">
  </div>
  <p id="wrongemail"></p>
  <div class="cntPasswordInput">
    <input type="password" placeholder="contraseña" class="login-input-log" id="login-password" required>
    <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/icons%2Fico-candado.svg?alt=media&token=33695f99-d052-44b6-ae30-b5ec0a3742ec" alt="port">
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
  <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/google.png?alt=media&token=3d2d9cd0-6ba2-42b9-a529-69de4a935fa9" class="imgGoogle"/>
  Iniciar sesión con google
</button>
<p class="whiteText">¿No tienes una cuenta? <a href="#signup" id="signingup">Regístrate</a></p> 
<a href="#">Olvidé mi contraseña</a>
</div>`;
segments.innerHTML = createLogin;

export const createSignup = `
<div class="logContainer">
  <div class="cntLogo">
  <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/logoblanco.svg?alt=media&token=64fe185b-42c6-4532-9176-83c181b1d993" alt="logo" class="logo">
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
      <a href="#home"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconhome.png?alt=media&token=f5fb9601-f952-4c53-8b69-1757cf167364" alt=""></a>
      <a href="#newpost"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconsubir.png?alt=media&token=7ceaf2f9-903d-4c6e-aa5a-0052a2c55a18" alt=""></a>
      <a href="#profile"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconuser.svg?alt=media&token=453cc4b7-96c7-41f2-94d0-29dad28b1d8a" alt=""></a>
    </div>
    <i class="fas fa-sign-out-alt iconOut" id="logout-button"></i>
    </div>
    </header>
    <div id="allPost" class="allPost"></div>
    <div id="userslist" class="userslist"></div>
    <footer class="optionsFoot">
      <a href="#home"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/home.svg?alt=media&token=4b4eac88-e8d3-4335-8062-68c761f3c773" alt=""></a>
      <a href="#newpost"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/subir.svg?alt=media&token=378ca9fd-b9d6-4193-b0be-a255fab6cca9" alt=""></a>
      <a href="#profile"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/user.svg?alt=media&token=69d2bb66-fd7d-4ae4-9db6-5a5238bbebcb" alt=""></a>
    </div>
  </footer>`;
