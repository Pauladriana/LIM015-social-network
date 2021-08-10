
export const crearUsuarioFb = (signupEmail, signupPassword, usernameInput, fullnameInput, passwordInput, emailInput) => {
  auth.createUserWithEmailAndPassword(signupEmail, signupPassword)
    .then((userCredential) => {
      console.log("registrado");
      fs.collection("users").add({
        username: usernameInput,
        fullname: fullnameInput,
        password: passwordInput,
        email: emailInput
      })
      .then((docRef) => {
        console.log("Este es el nuevo usuario: " + docRef.id);
      })
      .catch((error) => {
        console.log("Tienes el siguiente error: " + error);
      })
      signupForm.reset();
      window.history.pushState( {} , 'signup', '/login' );
      secciones.innerHTML = createLogin; 
    })
    .catch((err) => {
      const wrongSsignupEmail = document.querySelector('#wrongSUemail');
        if (err.message == 'The email address is already in use by another account.'){
          wrongSignupEmail.innerHTML = 'Este correo ya esta en uso, intenta con otro';
          wrongSignupEmail.style.color = 'red'
        }
      })
};

