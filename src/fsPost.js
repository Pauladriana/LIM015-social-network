
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
                    <div class='postDiv' data-id="${post.id}">
                      <div class="muroLocation">
                      <img src="./imagen/locacion.svg" alt="" class="locationIcon">
                      <p>${post.locacionInput}</p>
                      </div>
                      <h5>${post.tituloPost}</h5>
                      <div class="muroLike">
                      <p>Usuario</p>
                      <div class= "contadorLikes" ><i class="fas fa-heart" id="heartPost"></i><span>7</span></div>
                      </div>
                    </div>`;
          html += div;
        });
        publicaciones.innerHTML = html;
        // desde firebase se llama get
        const getPost = (id) => {
          fs.collection('publicaciones').doc(id).get().then((ele)=>{
            console.log(ele.data());
            if (ele.data()) {
              const user = ele.data();
              const costoPost = user.costoInput;
              const diasPost = user.diasInput;
              const nochesPost = user.nochesInput;
              const ninosPost = user.ninosInput;
              const peoplePost = user.personasInput;
              const titlePost = user.tituloPost;
              const contentPost = user.contenidoPost;
              const locationPost = user.locacionInput;
              const idPost = id;

              localStorage.setItem('costo', costoPost);
              localStorage.setItem('dias', diasPost);
              localStorage.setItem('noches', nochesPost);
              localStorage.setItem('ninos', ninosPost);
              localStorage.setItem('personas', peoplePost);
              localStorage.setItem('titulo', titlePost);
              localStorage.setItem('contenido', contentPost);
              localStorage.setItem('locacion', locationPost);
              localStorage.setItem('postId', idPost);
            }
          }).catch((err) => {
            console.log(err);
          })
        };
        const btnView = document.querySelectorAll('.postDiv');
        btnView.forEach( btn => {
          btn.addEventListener( 'click', async (e) => {
            await getPost(e.target.dataset.id);
              console.log('estas viendo el post el post')
              window.location.hash = 'viewpost';
            
          })
        })
      }
    };
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const fs = firebase.firestore();
        fs.collection('publicaciones').get()
          .then((snapshot) => {
            setupPost(snapshot.docs);
          });
      } else {
        setupPost([]);
      };
    });
  };