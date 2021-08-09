export const createLogin = `
<form action='' id='login-form'>
  <input type='email' placeholder='email' class='login-input' id='login-email' required>
  <input type='password' placeholder='password' class='login-input' id='login-password' required>
  <a href='#muro'><button type='button' id='login-button' class='submit-button'>LOGIN</button></a>
</form>
<p>OR</p>
<button type='button' id='google-login' class='google-login'>
  <img src='./imagen/google.png' class='imgGoogle'/>
  Log in with  google
</button>
<p>Dont have an account?<a href='#signup' id='signingup'>Sign up</a></p> 
<a href='#'>Forgot my password</a>`;
