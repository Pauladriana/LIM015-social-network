export const showAuthUsers = () => {
  const allUsers = document.querySelector("#userslist");
    
  const setupUsers = (data) => {
    if (data.length) {
      let html = "";
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

  // Eventos
  // Listar los datos para usuarios autenticados

  const auth = firebase.auth();
  auth.onAuthStateChanged((user) => {
    if (user) {
      fs.collection("users")
      .get()
      .then((snapshot) => {
        setupUsers(snapshot.docs);
      });
    } else {
      setupUsers([]);
    }
  });
}