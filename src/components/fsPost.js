import {
  postLike,
} from '../controller/post.js';

const fs = firebase.firestore();
export const showFsPost = () => {
  const userId = JSON.parse(localStorage.getItem('user')).uid;
  const posts = document.querySelector('#allPost');
  const setupPost = (data) => {
    posts.innerHTML = '';
    data.forEach((doc) => {
      const str = doc.username;
      const leng = 7;
      const trimmedString = str.substring(0, leng);
      const docId = doc.id;
      // console.log(docId, doc);
      const theDiv = document.createElement('div');
      theDiv.setAttribute('data-id', docId);
      const divTemplate = `
                    <div class='postDiv'>
                      <div class='destinationPost'>
                      <img src='./imagen/locacion.svg' alt='' class='locationIcon'>
                      <p>${doc.locacionInput}</p>
                      </div>
                      <h5>${doc.tituloPost}</h5>
                      <div class='postUserName'>
                      <p>${trimmedString}</p>
                      </div>
                    </div>
                    <div class= 'likesCounter' id='heartPost'><i class='fas fa-heart  ${doc.likes.includes(userId) ? 'liked' : 'unliked'}'></i><span class='totalLikes'>${doc.likes.length}</span></div>`;
      theDiv.innerHTML = divTemplate;

      // update likes
      const likes = theDiv.querySelector('.fa-heart');
      likes.addEventListener('click', () => {
        const result = doc.likes.indexOf(userId);
        if (result === -1) {
          const postLikes = doc.likes;
          postLikes.push(userId);
          postLike(docId, postLikes);
        } else {
          const postLikes = doc.likes;
          postLikes.splice(result, 1);
          postLike(docId, postLikes);
        }
      });

      const getPost = (id) => {
        // console.log(id);

        fs.collection('publicaciones').doc(id).get().then((ele) => {
          // console.log(ele.data());
          if (ele.data()) {
            const user = ele.data();
            // console.log(user);
            const costPost = user.costoInput;
            const daysPost = user.diasInput;
            const nightPost = user.nochesInput;
            const kidsPost = user.ninosInput;
            const peoplePost = user.personasInput;
            const titlePost = user.tituloPost;
            const contentPost = user.contenidoPost;
            const locationPost = user.locacionInput;
            const idPost = id;

            const post = {
              costPost,
              daysPost,
              nightPost,
              kidsPost,
              peoplePost,
              titlePost,
              contentPost,
              locationPost,
              idPost,
            };

            localStorage.setItem('postSelected', JSON.stringify(post));
            window.location.hash = 'viewpost';
          }
        })
          .catch(() => {
            // console.log(err);
          });
      };
      const post = theDiv.querySelector('.postDiv');
      post.addEventListener('click', () => {
        getPost(docId);
      });

      posts.appendChild(theDiv);
    });
  };
  // TERMINA setupPost(post)

  fs.collection('publicaciones').onSnapshot((snapshot) => {
    const post = [];
    snapshot.forEach((doc) => {
      post.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setupPost(post);
  });
};

export const showMyPosts = () => {
  const userId = JSON.parse(localStorage.getItem('user')).uid;
  // console.log(userId);
  const posts = document.querySelector('#allPost');
  const setupPost = (data) => {
    posts.innerHTML = '';
    // console.log(data);
    if (data.length !== 0) {
      data.forEach((doc) => {
        const str = doc.username;
        const leng = 7;
        const trimmedString = str.substring(0, leng);
        const docId = doc.id;
        // console.log(docId, doc);
        const theDiv = document.createElement('div');
        theDiv.setAttribute('data-id', docId);
        const divTemplate = `
                      <div class='postDiv'>
                        <div class='destinationPost'>
                        <img src='./imagen/locacion.svg' alt='' class='locationIcon'>
                        <p>${doc.locacionInput}</p>
                        </div>
                        <h5>${doc.tituloPost}</h5>
                        <div class='postUserName'>
                        <p>${trimmedString}</p>
                        </div>
                      </div>
                      <div class= 'likesCounter' id='heartPost'><i class='fas fa-heart  ${doc.likes.includes(userId) ? 'liked' : 'unliked'}'></i><span class='totalLikes'>${doc.likes.length}<span></div>`;
        theDiv.innerHTML = divTemplate;

        // update likes
        const likes = theDiv.querySelector('.fa-heart');
        likes.addEventListener('click', () => {
          const result = doc.likes.indexOf(userId);
          if (result === -1) {
            const postLikes = doc.likes;
            postLikes.push(userId);
            postLike(docId, postLikes);
          } else {
            const postLikes = doc.likes;
            postLikes.splice(result, 1);
            postLike(docId, postLikes);
          }
        });

        const getPost = (id) => {
          // console.log(id);

          fs.collection('publicaciones').doc(id).get().then((ele) => {
            // console.log(ele.data());
            if (ele.data()) {
              const user = ele.data();
              // console.log(user);
              const costPost = user.costoInput;
              const daysPost = user.diasInput;
              const nightPost = user.nochesInput;
              const kidsPost = user.ninosInput;
              const peoplePost = user.personasInput;
              const titlePost = user.tituloPost;
              const contentPost = user.contenidoPost;
              const locationPost = user.locacionInput;
              const idPost = id;

              const post = {
                costPost,
                daysPost,
                nightPost,
                kidsPost,
                peoplePost,
                titlePost,
                contentPost,
                locationPost,
                idPost,
              };

              localStorage.setItem('postSelected', JSON.stringify(post));
              window.location.hash = 'viewpost';
            }
          })
            .catch(() => {
            // console.log(err);
            });
        };
        const post = theDiv.querySelector('.postDiv');
        post.addEventListener('click', () => {
          getPost(docId);
        });

        posts.appendChild(theDiv);
      });
    } else {
      const theDiv = document.createElement('div');
      const divTemplate = `
          <div style='height: 250px;
                      padding: 0px 40px;
                      display: flex;
                      align-items: center;'>
            <h1 style='font-size: 20px; color: #666666;'>Aun no hiciste ninguna publicacion, te me estas quedando hija !!! , échale ganas wey !!</h1>
          </div>`;
      theDiv.innerHTML = divTemplate;
      posts.appendChild(theDiv);
    }
  }; // TERMINA setupPost(post)
  fs.collection('publicaciones').onSnapshot((snapshot) => {
    const post = [];
    snapshot.forEach((doc) => {
      if (userId === doc.data().userId) {
        post.push({
          id: doc.id,
          ...doc.data(),
        });
      }
    });
    setupPost(post);
  });
};
