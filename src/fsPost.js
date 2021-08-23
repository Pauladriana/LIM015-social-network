//import {getPubli} from './post.js';

export const showFsPost = () => {
  const publicaciones = document.querySelector('#allPost');
  const btnView = document.querySelectorAll('.postDiv');
  const setupPost = (data) => {
    publicaciones.innerHTML = '';
    let html = '';
    data.forEach((doc) => {
      const docId = doc.id;
      console.log(docId, doc);
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
                      <p>Usuario</p>
                      </div>
                    </div>
                    <div class= "contadorLikes" id="heartPost"><i class="fas fa-heart"></i><span class='totalLikes'>${doc.likes.length}</span></div>
                `;
      elDiv.innerHTML = divTemplate;
      

   
    // update likes
      const likes = elDiv.querySelector('.fa-heart');
      let allLikes = 0;
      //console.log(likes);
        console.log(likes);
        likes.addEventListener( 'click', () => {
          if (likes.className === 'fas fa-heart') {
            likes.className = 'fas fa-heart rojoHeart';
            if(allLikes === 0) {
              allLikes += 1;
              const result = doc.likes;
              result.push(allLikes);
              console.log(result);
              console.log(docId)
              fs.collection('publicaciones').doc(docId).update({ likes: result })
            } else {
              likes.className = 'fas fa-heart';
              allLikes = 0;
            }
          }
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
