export const showFsPost = () => {
    const publicaciones = document.querySelector('#allPost');
    //const logoutOption = document.querySelector('#logout-button');
    const setupPost = (data) => {
      if (data.length) {
        let html = '';
        data.forEach((doc) => {
          const post = doc.data();
          // console.log(user)
          const div = `
                    <div class='postDiv'>
                      <h5>${post.titulo}</h5>
                      <p>${post.contenido}</p>
                    </div>`;
          html += div;
        });
        publicaciones.innerHTML = html;
      }
    };
  
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const fs = firebase.firestore();
        fs.collection('publicaciones')
          .get()
          .then((snapshot) => {
            setupPost(snapshot.docs);
          });
      } else {
        setupPost([]);
      }
    });
  };
  