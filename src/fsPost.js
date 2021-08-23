//import {getPubli} from './post.js';

export const showFsPost = () => {
  const publicaciones = document.querySelector('#allPost');
  const btnView = document.querySelectorAll('.postDiv');
  let html = '';
  const setupPost = (data) => {
    let html = '';
      data.forEach((doc) => {
      const post = doc;
      const docId = doc.id;
      console.log(docId, post);
        const div = `
                <div>
                    <div class='postDiv' data-id="${docId}">
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
                </div>`;
        html += div;
    publicaciones.innerHTML = html;

  
    // update likes
    const likes = document.querySelectorAll('.fa-heart');
    let allLikes = 0;
    likes.forEach( btn => {
      btn.addEventListener( 'click', () => {
        if (btn.className === 'fas fa-heart') {
          btn.className = 'fas fa-heart rojoHeart';
          if(allLikes === 0) {
            allLikes += 1;
            const result = doc.likes;
            result.push(allLikes);
            console.log(result);
            console.log(docId)
            fs.collection('publicaciones').doc(docId).update({ likes: result })
          } else {
              btn.className = 'fas fa-heart';
              allLikes = 0;
          }
        }
      })
    
        btnView.forEach( btn => {
          btn.addEventListener( 'click', async (e) => {
            await getPost(doc.id);
              console.log('estas viendo el post el post')
              window.location.hash = 'viewpost';
          })
        })
    });
  })
  }

  fs.collection('publicaciones').onSnapshot(snapshot => {
    const post = [];
    snapshot.forEach((doc) => {
      post.push({
        id: doc.id,
        ...doc.data(),
      });
    })
    console.log(post);
    setupPost(post)
    
  })
}
