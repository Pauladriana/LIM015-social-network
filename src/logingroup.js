
const secciones = document.querySelector('#secciones');

/*const loginSection = document.querySelector("#login");
const signupSection = document.querySelector("#signup");
const muroSection = document.querySelector("#muro");*/

// creando dinamicamente la vista login 
export const createLogin = `
<form action="" id="login-form">
  <input type="email" placeholder="email" class="login-input" id="login-email" required>
  <input type="password" placeholder="password" class="login-input" id="login-password" required>
  <a href="#muro"><button type="button" id="login-button" class="submit-button">LOGIN</button></a>
</form>
<p>OR</p>
<button type="button" id="google-login" class="google-login">
  <img src="./imagen/google.png" class="imgGoogle"/>
  Log in with  google
</button>
<p>Dont have an account?<a href="#signup" id="signingup">Sign up</a></p> 
<a href="#">Forgot my password</a>`;
secciones.innerHTML = createLogin;

// creando dinamicamente la vista registro 
export const createSignup = `
  <p>Travel with me</p>
  <form action="" id="signup-form">
    <input type="text" placeholder="Fullname" class="login-input" id="fullname" required>
    <input type="text" placeholder="Username" class="login-input" id="username" required>
    <input type="password" placeholder="Password" class="login-input"  id="signup-password" required>
    <input type="password" placeholder="Confirm password" class="login-input" required>
    <input type="email" placeholder="Email" class="login-input" id="signup-email" required>
    <div class="terminos">
      <input type="checkbox" class="accept" id="accept">
      <label for="accept">He Leido y acepto los terminos y condiciones</label>
    </div>
    <a href="#login"><button type="button" id="submit-button" class="submit-button">SIGN UP</button></a>
  </form>
  <a href="#login" id="cancelar"><button class="cancel-button" id="cancel-button">Cancel</button></a>`;
  //secciones.innerHTML = createSignup;

// creando dinamicamente la vista muro 
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
    <a href="#login"><button class="logout-button" type="button" id="logout-button">LOGOUT</button></a>`;
    //secciones.innerHTML = createMuro;
  