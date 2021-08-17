
export const createNewPost = `
<body id="postBody">
  <header class="mainHeader">
    <span>Traveler.pe</span>
    <img src="./imagen/user.svg" alt="">
  </header>
  <main>
    <section class="fotografias">
      <img src="./imagen/apurimac3.svg" alt="">
    </section>
    <section class="iconos">
      <div id="costo" class="travelOpt">
        <img src="./imagen/cash.svg" alt="" class="iconPost">
        <input type="number" class="inputPost">
      </div>
      <div id="dias" class="travelOpt">
        <img src="./imagen/sun.svg" alt="" class="iconPost">
        <input type="number" class="inputPost">
      </div>
      <div id="noches" class="travelOpt">
        <img src="./imagen/moon.svg" alt="" class="iconPost">
        <input type="number" class="inputPost">
      </div>
      <div id="personas" class="travelOpt">
        <img src="./imagen/family.svg" alt="" class="iconPost">
        <input type="number" class="inputPost">
      </div>
      <div id="niños" class="travelOpt">
        <img src="./imagen/child.svg" alt="" class="iconPost">
        <input type="number" class="inputPost">
      </div>
    </section>
    <section class="historia">
      <input type="text" class="tituloPost" id="tituloPost" placeholder="Titula tu experiencia...">
      <textarea class="contenidoPost" id="contenidoPost" placeholder="Cuentanos sobre tu viaje..."></textarea>
      <div class="locacion">
        <img src="./imagen/locacion.svg" alt="" class="locationIcon">
        <input type="text" class="locationInput" placeholder="Ubicacion del viaje">
      </div>
    </section>
    <button class="publiPost" id="publiPost">Publicar</button>
  </main>
  <footer class="opcionesFoot">
      <img src="./imagen/home.svg" alt="">
      <img src="./imagen/buscar.svg" alt="">
      <img src="./imagen/subir.svg" alt="">
      <img src="./imagen/notificaciones.svg" alt="">
      <img src="./imagen/mensajes.svg" alt="">
  </footer>
</body>`;
