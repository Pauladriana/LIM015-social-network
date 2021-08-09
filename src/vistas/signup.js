export const createSignup = `
  <p>Travel with me</p>
  <form action='' id='signup-form'>
    <input type='text' placeholder='Fullname' class='login-input' id='fullname' required>
    <input type='text' placeholder='Username' class='login-input' id='username' required>
    <input type='password' placeholder='Password' class='login-input'  id='signup-password' required>
    <input type='password' placeholder='Confirm password' class='login-input' required>
    <input type='email' placeholder='Email' class='login-input' id='signup-email' required>
    <div class='terminos'>
      <input type='checkbox' class='accept' id='accept'>
      <label for='accept'>He Leido y acepto los terminos y condiciones</label>
    </div>
    <a href='#login'><button type='button' id='submit-button' class='submit-button'>SIGN UP</button></a>
  </form>
  <a href='#login' id='cancelar'><button class='cancel-button' id='cancel-button'>Cancel</button></a>`;
