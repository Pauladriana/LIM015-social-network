// funcion mostrar contraseña
const fs = firebase.firestore();

export const showingPassword = () => {
  const showPassword = document.querySelector('#show-password');
  showPassword.addEventListener('change', () => {
    const passwordFirst = document.querySelector('#login-password');
    if (passwordFirst.type === 'text') {
      passwordFirst.type = 'password';
    } else {
      passwordFirst.type = 'text';
    }
  });
};

export const validateEmail = (user) => {
  fs.collection('users')
    .get()
    .then((querySnapshot) => {
      const tmp = querySnapshot.docs.find((ele) => ele.data().email === user.email);
      // console.log(tmp);
      /* Si no encuentra el email que se quiere registrar;
      el valor de tmp será undefined, por ende agrega el nuevo user en base de datos */
      // si encuentra el email en base de datos; el valor
      // de tmp será el user encontrado , por ende solo cambia la vista a muro
      if (tmp !== undefined) {
        localStorage.setItem('user', JSON.stringify(user));
        // console.log('usuario existente logueado');
        window.location.hash = 'home';
      } else {
        fs.collection('users')
          .add({
            username: user.displayName,
            fullname: user.displayName,
            password: user.providerId,
            email: user.email,
          })
          .then(() => {
            localStorage.setItem('user', JSON.stringify(user));
            // console.log('Creado y agregado a database');
            window.location.hash = 'home';
            // console.log('Este es el nuevo usuario: ' + docRef.id);
          })
          .catch(() => {
            // console.log('Tienes el siguiente error: ' + error);
          });
      }
    });
};
