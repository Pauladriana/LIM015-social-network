export const usuariosMuro = () => {
  const allUsers = document.querySelector('#userslist');
  const setupUsers = (data) => {
    if (data.length) {
      let html = '';
      data.forEach((doc) => {
        const user = doc.data();
        console.log(user);
        const li = `
                    <li class='list-group-item list-group-item-action'>
                      <h5>${user.username}</h5>
                      <p>${user.fullname}</p>
                    </li>`;
        html += li;
      });
      allUsers.innerHTML = html;
    } else {
      allUsers.innerHTML = `<p>Login to meet the travelers</p>`;
    }
  };
  // EVENTOS
  // LISTAR LOS DATOS PARA URUARIOS AUTENTICOS
  auth.onAuthStateChanged((user) => {
    if (user) {
      fs.collection('users')
        .get()
        .then((snapshot) => {
          setupUsers(snapshot.docs);
        });
    } else {
      setupUsers([]);
    }
  });
};
