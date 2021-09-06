export const createNewPost = `
<body id="postBody">
    <header class="

navbar">
    <span class="textTraveler">Traveler.pe</span>
    <div class="navbarIcons">
    <div class="menuIcons">
      <a href="#home"><img src="../imagen/iconhome.png" alt=""></a>
      <a href="#newpost"><img src="../imagen/iconsubir.png" alt=""></a>
      <a href="#profile"><img src="../imagen/iconuser.svg" alt=""></a>
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
            <img src="../imagen/cash.svg" alt="" class="iconPost" title = "Monto en soles">
            <input type="number" class="inputPost" id="inputCost">
          </div>
          <div class="travelOpt">
            <img src="../imagen/sun.svg" alt="" class="iconPost" title = "Cuantos Dias">
            <input type="number" class="inputPost" id="inputDay">
          </div>
          <div class="travelOpt">
            <img src="../imagen/moon.svg" alt="" class="iconPost" title = "Cuantas Noches">
            <input type="number" class="inputPost" id="inputNight">
          </div>
          <div class="travelOpt">
            <img src="../imagen/family.svg" alt="" class="iconPost" title = "Numero de Personas">
            <input type="number" class="inputPost" id="inputPeople">
          </div>
          <div class="travelOpt">
            <img src="../imagen/child.svg" alt="" class="iconPost" title = "Numero de niños">
            <input type="number" class="inputPost" id="inputChild">
          </div>
        </section>
        <section class="story">
          <input type="text" class="postTitle" id="postTitle" placeholder="Titula tu experiencia...">
          <textarea class="postContent" id="postContent" placeholder="Cuentanos sobre tu viaje..."></textarea>
          <div class="location">
            <img src="../imagen/locacion.svg" alt="" class="locationIcon">
            <input type="text" class="locationInput" id="locationInput" placeholder="Ubicacion del viaje">
          </div>
        </section>
        <p id='validationAlert'></p>
        <button class="sharePost" id="sharePost">Publicar</button>
        <div>
    </div>
  </main>
  <footer class="optionsFoot">
    <a href="#home"><img src="../imagen/home.svg" alt=""></a>
    <a href="#newpost"><img src="../imagen/subir.svg" alt=""></a>
    <a href="#profile"><img src="../imagen/user.svg" alt=""></a>
  </footer>
</body>`;

export const viewPost = `
<body id="postBody">
    <header class="mainHeader">
    <span class="textTraveler">Traveler.pe</span>
    <div class="navbarIcons">
    <div class="menuIcons">
      <a href="#home"><img src="../imagen/iconhome.png" alt=""></a>
      <a href="#newpost"><img src="../imagen/iconsubir.png" alt=""></a>
      <a href="#profile"><img src="../imagen/iconuser.svg" alt=""></a>
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
          <img src="../imagen/locacion.svg" alt="" class="locationIcon">
          <span type="text" class="locationInput" id="viewLocation"></span>
          </div>
          <div class="travelOpt">
            <img src="../imagen/puntos.svg" alt="" class="postSettings" id="optionPost">
          </div>
      </div>
    <h2 class="postTitle" id="viewTitle"></h2>
    <section class="icons">
      <div class="travelOpt">
        <img src="../imagen/cash.svg" alt="" class="iconPost">
        <p class="colorBlack" id="viewCost">Costo</p>
      </div>
      <div class="travelOpt">
        <img src="../imagen/sun.svg" alt="" class="iconPost">
        <p class="colorBlack" id="viewDays">Dias</p>
      </div>
      <div class="travelOpt">
        <img src="../imagen/moon.svg" alt="" class="iconPost">
        <P class="colorBlack" id="viewNight">Noches</P>
      </div>
      <div class="travelOpt">
        <img src="../imagen/family.svg" alt="" class="iconPost">
        <p class="colorBlack" id="viewPeople">personas</p>
      </div>
      <div class="travelOpt">
        <img src="../imagen/child.svg" alt="" class="iconPost">
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
    <a href="#home"><img src="../imagen/home.svg" alt=""></a>
    <a href="#newpost"><img src="../imagen/subir.svg" alt=""></a>
    <a href="#profile"><img src="../imagen/user.svg" alt=""></a>
  </footer>
</body>`;

export const editPost = `
<body id="postBody">
  <header class="mainHeader">
    <span class="textTraveler">Traveler.pe</span>
    <div class="navbarIcons">
    <div class="menuIcons">
      <a href="#home"><img src="../imagen/iconhome.png" alt=""></a>
      <a href="#newpost"><img src="../imagen/iconsubir.png" alt=""></a>
      <a href="#profile"><img src="../imagen/iconuser.svg" alt=""></a>
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
        <img src="../imagen/locacion.svg" alt="" class="locationIcon">
        <input type="text" class="locationEdit" id="editLocation" placeholder="Locacion">
    </div>
    <input type="text" class="editTitle" placeholder="Titulo" id="editTitle">
    <section class="iconsEdit">
      <div class="travelOpt">
        <img src="../imagen/cash.svg" alt="" class="iconPost">
        <input type="number" class="inputPost" id="editCost">
      </div>
      <div class="travelOpt">
        <img src="../imagen/sun.svg" alt="" class="iconPost">
        <input type="number" class="inputPost" id="editDays">
      </div>
      <div class="travelOpt">
        <img src="../imagen/moon.svg" alt="" class="iconPost">
        <input type="number" class="inputPost" id="editNight">
      </div>
      <div class="travelOpt">
        <img src="../imagen/family.svg" alt="" class="iconPost">
        <input type="number" class="inputPost" id="editPeople">
      </div>
      <div class="travelOpt">
        <img src="../imagen/child.svg" alt="" class="iconPost">
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
    <a href="#home"><img src="../imagen/home.svg" alt=""></a>
    <a href="#newpost"><img src="../imagen/subir.svg" alt=""></a>
    <a href="#profile"><img src="../imagen/user.svg" alt=""></a>
  </footer>
</body>`;
