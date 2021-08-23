//import {getPubli} from './post.js';
let userId = JSON.parse(localStorage.getItem('user')).uid;
export const showFsPost = () => {
  const publicaciones = document.querySelector('#allPost');
  const btnView = document.querySelectorAll('.postDiv');
  const setupPost = (data) => {
    publicaciones.innerHTML = '';
    data.forEach((doc) => {
      let str = doc.username;
      let leng = 7;
      let trimmedString = str.substring(0, leng);
      const docId = doc.id;
      //console.log(docId, doc);
      const elDiv = document.createElement('div');
      elDiv.setAttribute('data-id', docId);
      const divTemplate = `
                    <div class='postDiv'>
                      <div class="muroLocation">
                      <img src="./imagen/locacion.svg" alt="" class="locationIcon">
                      <p>${doc.locacionInput}</p>
                      </div>
                      <h5>${doc.tituloPost}</h5>
                      <div class="muroLike">
                      <p>${trimmedString}</p>
                      </div>
                    </div>
                    <div class= "contadorLikes" id="heartPost"><i class="fas fa-heart  ${
                      doc.likes.includes(userId) ? 'liked' : 'unliked'
                    }"></i><span class='totalLikes'>${doc.likes.length}</span></div>
                `;
      elDiv.innerHTML = divTemplate;
      
    // update likes
      const likes = elDiv.querySelector('.fa-heart');
        likes.addEventListener( 'click', () => {
          const result = doc.likes.indexOf(userId);
          if (result === -1) {
            let postLikes = doc.likes
            postLikes.push(userId);
            fs.collection('publicaciones').doc(docId).update({ likes: postLikes });
          } else {
            let postLikes = doc.likes
            postLikes.splice(result, 1);
            fs.collection('publicaciones').doc(docId).update({ likes: postLikes });
          }
        })

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
      const post = elDiv.querySelector('.postDiv');
        post.addEventListener( 'click', () => {
          getPost(docId);
        })

      /*btnView.forEach( btn => {
        btn.addEventListener( 'click', async (e) => {
          await getPost(docId);
          console.log('estas viendo el post el post')
          window.location.hash = 'viewpost';
        })
      })*/
      publicaciones.appendChild(elDiv);
    })
  } /*TERMINA setupPost(post)*/

  fs.collection('publicaciones').onSnapshot(snapshot => {
    const post = [];
    snapshot.forEach((doc) => {
      post.push({
        id: doc.id,
        ...doc.data(),
      });
    })
    setupPost(post)
  })
}
