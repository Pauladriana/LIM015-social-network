
export const showFsPost = () => {
    const publicaciones = document.querySelector('#allPost');
    //const logoutOption = document.querySelector('#logout-button');
    const setupPost = (data) => {
      if (data.length) {
        let html = '';
        data.forEach((doc) => {
          const post = doc.data();
          let str = post.username;
          let leng = 7;
          let trimmedString = str.substring(0, leng);
          post.id = doc.id;
          const div = `
                    <div class='postDiv' data-id="${post.id}">
                      <div class="muroLocation">
                      <img src="./imagen/locacion.svg" alt="" class="locationIcon">
                      <p>${post.locacionInput}</p>
                      </div>
                      <h5>${post.tituloPost}</h5>
                      <div class="muroLike">
                      <p>${trimmedString}</p>
                      <div class= "contadorLikes" ><i class="fas fa-heart" id="heartPost"></i><span>7</span></div>
                      </div>
                    </div>`;
          html += div;
        });
        publicaciones.innerHTML = html;
        // desde firebase se llama get
        const getPost = (id) => {
          console.log(id);

          fs.collection('publicaciones').doc(id).get().then((ele)=>{
            console.log(ele.data());
            if (ele.data()) {
              const user = ele.data();
              console.log(user);
              const costoPost = user.costoInput;
              const diasPost = user.diasInput;
              const nochesPost = user.nochesInput;
              const ninosPost = user.ninosInput;
              const peoplePost = user.personasInput;
              const titlePost = user.tituloPost;
              const contentPost = user.contenidoPost;
              const locationPost = user.locacionInput;
              const idPost = id;

              let post = {
                costoPost: costoPost,
                diasPost: diasPost,
                nochesPost: nochesPost,
                ninosPost: ninosPost,
                peoplePost: peoplePost,
                titlePost: titlePost,
                contentPost: contentPost,
                locationPost: locationPost,
                idPost: idPost
              };

              localStorage.setItem('postSelected', JSON.stringify(post));
              window.location.hash = 'viewpost';
            }
          }).catch((err) => {
            console.log(err);
          })
        };
        const btnView = document.querySelectorAll('.postDiv');
        btnView.forEach( btn => {
          btn.addEventListener( 'click', function(e) {
            console.log(e.target);
            if (e.target.dataset.id != undefined) {
              getPost(e.target.dataset.id);
              console.log('estas viendo el post el post');
            }
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