export const createNewPost = `
<body id="postBody">
    <header class="

navbar">
    <span class="textTraveler">Traveler.pe</span>
    <div class="navbarIcons">
    <div class="menuIcons">
      <a href="#home"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconhome.png?alt=media&token=f5fb9601-f952-4c53-8b69-1757cf167364" alt=""></a>
      <a href="#newpost"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconsubir.png?alt=media&token=7ceaf2f9-903d-4c6e-aa5a-0052a2c55a18" alt=""></a>
      <a href="#profile"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconuser.svg?alt=media&token=453cc4b7-96c7-41f2-94d0-29dad28b1d8a" alt=""></a>
    </div>
    <i class="fas fa-sign-out-alt iconOut" id="logout-button"></i>
    </div>
    </header>
  <main>
    <div class="newPost">
        <section class="picturesCnt">
        </section>
        <div class="newPostCnt">
        <section class="icons">
          <div class="travelOpt">
            <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/cash.svg?alt=media&token=cc4aa018-acd3-450a-a8b8-c5816e6a0068" alt="" class="iconPost" title = "Monto en soles">
            <input type="number" class="inputPost" id="inputCost">
          </div>
          <div class="travelOpt">
            <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/sun.svg?alt=media&token=ac65174b-9210-49e2-a20c-b0798615f405" alt="" class="iconPost" title = "Cuantos Dias">
            <input type="number" class="inputPost" id="inputDay">
          </div>
          <div class="travelOpt">
            <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/moon.svg?alt=media&token=e4f2a7af-3624-44f8-8f5f-26896bcdc60f" alt="" class="iconPost" title = "Cuantas Noches">
            <input type="number" class="inputPost" id="inputNight">
          </div>
          <div class="travelOpt">
            <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/family.svg?alt=media&token=94420131-05bf-456e-9d65-2bd94f9adb60" alt="" class="iconPost" title = "Numero de Personas">
            <input type="number" class="inputPost" id="inputPeople">
          </div>
          <div class="travelOpt">
            <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/child.svg?alt=media&token=210a1e72-d897-4c18-8c68-770d30fef812" alt="" class="iconPost" title = "Numero de niños">
            <input type="number" class="inputPost" id="inputChild">
          </div>
        </section>
        <section class="story">
          <input type="text" class="postTitle" id="postTitle" placeholder="Titula tu experiencia...">
          <textarea class="postContent" id="postContent" placeholder="Cuentanos sobre tu viaje..."></textarea>
          <div class="location">
            <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/locacion.svg?alt=media&token=f46b1d22-43c6-442a-8ff7-6dc1b41bfd7d" alt="" class="locationIcon">
            <input type="text" class="locationInput" id="locationInput" placeholder="Ubicacion del viaje">
          </div>
        </section>
        <p id='validationAlert'></p>
        <button class="sharePost" id="sharePost">Publicar</button>
        <div>
    </div>
  </main>
  <footer class="optionsFoot">
    <a href="#home"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/home.svg?alt=media&token=4b4eac88-e8d3-4335-8062-68c761f3c773" alt=""></a>
    <a href="#newpost"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/subir.svg?alt=media&token=378ca9fd-b9d6-4193-b0be-a255fab6cca9" alt=""></a>
    <a href="#profile"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/user.svg?alt=media&token=69d2bb66-fd7d-4ae4-9db6-5a5238bbebcb" alt=""></a>
  </footer>
</body>`;

export const viewPost = `
<body id="postBody">
    <header class="mainHeader">
    <span class="textTraveler">Traveler.pe</span>
    <div class="navbarIcons">
    <div class="menuIcons">
      <a href="#home"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconhome.png?alt=media&token=f5fb9601-f952-4c53-8b69-1757cf167364" alt=""></a>
      <a href="#newpost"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconsubir.png?alt=media&token=7ceaf2f9-903d-4c6e-aa5a-0052a2c55a18" alt=""></a>
      <a href="#profile"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconuser.svg?alt=media&token=453cc4b7-96c7-41f2-94d0-29dad28b1d8a" alt=""></a>
    </div>
    <i class="fas fa-sign-out-alt iconOut" id="logout-button"></i>
    </div>
    </header>
    <main>
    <div class="viewPost">
    <div class="containerPost">
      <div class="userPicture">
        <img class="photoViewPost" src="" alt="" id="veiwPhoto">
          <div class="userClass">
            <p id="userEmailPost"></p>
          </div>
      </div>
    <div class="viewPostContent">
      <div class="location">
          <div class="iconLocation">
          <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/locacion.svg?alt=media&token=f46b1d22-43c6-442a-8ff7-6dc1b41bfd7d" alt="" class="locationIcon">
          <span type="text" class="locationInput" id="viewLocation"></span>
          </div>
          <div class="travelOpt">
            <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/puntos.svg?alt=media&token=b2a42227-1d50-4f69-ad99-a1849526dbc9" alt="" class="postSettings" id="optionPost">
          </div>
      </div>
    <h2 class="postTitle" id="viewTitle"></h2>
    <section class="icons">
      <div class="travelOpt">
        <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/cash.svg?alt=media&token=cc4aa018-acd3-450a-a8b8-c5816e6a0068" alt="" class="iconPost">
        <p class="colorBlack" id="viewCost">Costo</p>
      </div>
      <div class="travelOpt">
        <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/sun.svg?alt=media&token=ac65174b-9210-49e2-a20c-b0798615f405" alt="" class="iconPost">
        <p class="colorBlack" id="viewDays">Dias</p>
      </div>
      <div class="travelOpt">
        <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/moon.svg?alt=media&token=e4f2a7af-3624-44f8-8f5f-26896bcdc60f" alt="" class="iconPost">
        <P class="colorBlack" id="viewNight">Noches</P>
      </div>
      <div class="travelOpt">
        <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/family.svg?alt=media&token=94420131-05bf-456e-9d65-2bd94f9adb60" alt="" class="iconPost">
        <p class="colorBlack" id="viewPeople">personas</p>
      </div>
      <div class="travelOpt">
        <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/child.svg?alt=media&token=210a1e72-d897-4c18-8c68-770d30fef812" alt="" class="iconPost">
        <p class="colorBlack" id="viewchild">niños</p>
      </div>
      <div class="modalEditRemove" id="modalEditRemove">
      <div class="boxModalEditRemove">
        <a class="textSecondary xCerrar" id="closeModalEditRomve">x</a>
        <div class="dividerModal"></div>
        <p><a href="#editpost" class="textSecondary textEditRemove editModal">Editar</a></p>
        <p class="textSecondary textEditRemove" id="ShowModalConfirmation" >Eliminar</p>
      </div>
    </div>

    <div class="modalRemove" id="modalRemove">
      <div class="boxModal">
        <h3>¿De verdad quieres eliminar esta publicacion?</h3>
        <p class="textBlack" >Luego ya no podra ser recuperada</p><hr>
        <p class="textPrimary" id="textRemovePost">Eliminar</p><hr>
        <p class="textSecondary" id="closeModal">Quiero volver</p>
      </div>
    </div>
    </section>
    <section>
      <p id="viewContent" class="viewContent"></p>
    </section>
    </div>
    <div class="likesDate">
      <div class="likesCounter">
        <i class="fas fa-heart" aria-hidden="true"></i>
        <span id="likesPost"></span>
      </div>
      <div class="commentaryCounter">
        <i class="far fa-comment"></i>
        <span id="commentsPost"></span>
      </div>
      <div class="datePost">
        <span id="postDate"></span>
      </div>
    </div>
    <hr>
    </div>
    <section class="commentary" id="commentary">
    </section>
    </div>
    </main>
  <footer class="optionsFoot">
    <a href="#home"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/home.svg?alt=media&token=4b4eac88-e8d3-4335-8062-68c761f3c773" alt=""></a>
    <a href="#newpost"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/subir.svg?alt=media&token=378ca9fd-b9d6-4193-b0be-a255fab6cca9" alt=""></a>
    <a href="#profile"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/user.svg?alt=media&token=69d2bb66-fd7d-4ae4-9db6-5a5238bbebcb" alt=""></a>
  </footer>
</body>`;

export const editPost = `
<body id="postBody">
  <header class="mainHeader">
    <span class="textTraveler">Traveler.pe</span>
    <div class="navbarIcons">
    <div class="menuIcons">
      <a href="#home"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconhome.png?alt=media&token=f5fb9601-f952-4c53-8b69-1757cf167364" alt=""></a>
      <a href="#newpost"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconsubir.png?alt=media&token=7ceaf2f9-903d-4c6e-aa5a-0052a2c55a18" alt=""></a>
      <a href="#profile"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconuser.svg?alt=media&token=453cc4b7-96c7-41f2-94d0-29dad28b1d8a" alt=""></a>
    </div>
    <i class="fas fa-sign-out-alt iconOut" id="logout-button"></i>
    </div>
  </header>
  <main>
  <div class="editPost">
    <section class="picturesCnt">
    </section>
    <div class="containerPostEdit">
    <div class="locationEditCnt">
        <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/locacion.svg?alt=media&token=f46b1d22-43c6-442a-8ff7-6dc1b41bfd7d" alt="" class="locationIcon">
        <input type="text" class="locationEdit" id="editLocation" placeholder="Locacion">
    </div>
    <input type="text" class="editTitle" placeholder="Titulo" id="editTitle">
    <section class="iconsEdit">
      <div class="travelOpt">
        <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/cash.svg?alt=media&token=cc4aa018-acd3-450a-a8b8-c5816e6a0068" alt="" class="iconPost">
        <input type="number" class="inputPost" id="editCost">
      </div>
      <div class="travelOpt">
        <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/sun.svg?alt=media&token=ac65174b-9210-49e2-a20c-b0798615f405" alt="" class="iconPost">
        <input type="number" class="inputPost" id="editDays">
      </div>
      <div class="travelOpt">
        <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/moon.svg?alt=media&token=e4f2a7af-3624-44f8-8f5f-26896bcdc60f" alt="" class="iconPost">
        <input type="number" class="inputPost" id="editNight">
      </div>
      <div class="travelOpt">
        <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/family.svg?alt=media&token=94420131-05bf-456e-9d65-2bd94f9adb60" alt="" class="iconPost">
        <input type="number" class="inputPost" id="editPeople">
      </div>
      <div class="travelOpt">
        <img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/child.svg?alt=media&token=210a1e72-d897-4c18-8c68-770d30fef812" alt="" class="iconPost">
        <input type="number" class="inputPost" id="editchild">
      </div>
    </section>
    <section>
      <textarea class="postContent" id="editContent" placeholder="Cuenta tu historia"></textarea>
    </section>
    <div class="saveButton">
      <button class="sharePost" id="saveThePost">Guardar</button>
    </div>
  </div>
  </div>
  </main>
  <footer class="optionsFoot">
    <a href="#home"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/home.svg?alt=media&token=4b4eac88-e8d3-4335-8062-68c761f3c773" alt=""></a>
    <a href="#newpost"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/subir.svg?alt=media&token=378ca9fd-b9d6-4193-b0be-a255fab6cca9" alt=""></a>
    <a href="#profile"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/user.svg?alt=media&token=69d2bb66-fd7d-4ae4-9db6-5a5238bbebcb" alt=""></a>
  </footer>
</body>`;
