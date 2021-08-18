export const showFsPost = () => {
    const publicaciones = document.querySelector('#allPost');
    //const logoutOption = document.querySelector('#logout-button');
    
    const setupPost = (data) => {
      if (data.length) {
        let html = '';
        data.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;
          // console.log(user)
          const div = `
                    <div class='postDiv'>
                      <h5>${post.titulo}</h5>
                      <p>${post.contenido}</p>
                      <button class="btn-delete" data-id="${post.id}" >Eliminar</button>
                      <button class="btn-edit" data-id="${post.id}">Modificar</button>
                    </div>`;
          html += div;
        });
        publicaciones.innerHTML = html;
        // desde firebase elimina
        const deletePost = id => fs.collection('publicaciones').doc(id).delete();
        // boton eliminar
        const btnDelete = document.querySelectorAll('.btn-delete');
        btnDelete.forEach( btn => {
          btn.addEventListener( 'click', async (e) => {
            await deletePost(e.target.dataset.id)
            //window.location.hash = 'muro';
            window.location.reload();
          })
        })
        // ---
        // desde firebase se llama get
        /*const getPost = (id) => fs.collection('publicaciones').doc(id).get();*/
        // boton editar
        /*const btnEdit = document.querySelectorAll('.btn-edit');
        btnEdit.forEach( btn => {
          btn.addEventListener( 'click', async (e) => {
            const postId = await getPost(e.target.dataset.id);
            console.log(postId.data());
            const task = postId.data();
            window.location.hash = 'newpost';
            const algo = document.getElementById('tituloPost').value;
            console.log(algo);
            document.getElementById('tituloPost').value = task.titulo;
            console.log(document.querySelector('#tituloPost'));
            document.querySelector('#contenidoPost').value = task.contenido;
          })
        })*/
        // ---
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
  
  //EDITAR POST
  export const editPost = (idPost, description) => {
    // Obtener acceso a Firestore
    const db = firebase.firestore();
    return db.collection('post').doc(idPost).update({
      description,
    });
  };