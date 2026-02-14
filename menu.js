const btnCarta = document.getElementById("btnCarta");
const btnJuego = document.getElementById("btnJuego");
const btnSanValentin = document.getElementById("btnSanValentin");
const btnRegalo = document.getElementById("btnRegalo");

const diasElemento = document.getElementById("dias");
const horasElemento = document.getElementById("horas");
const minutosElemento = document.getElementById("minutos");
const segundosElemento = document.getElementById("segundos");

const modal = document.getElementById("modal");
const iframeProyecto = document.getElementById("iframeProyecto");
const cerrarModal = document.getElementById("cerrarModal");

const tiempo = document.getElementById("tiempo");

// Fecha objetivo: PRUEBA (YA MISMO)
const fechaSanValentin = new Date();

// ================================
// ABRIR MODAL CON IFRAME
// ================================
function abrirProyecto(ruta) {
    iframeProyecto.src = ruta;
    modal.classList.remove("oculto");
}

// Cerrar modal normal
cerrarModal.addEventListener("click", () => {
    modal.classList.add("oculto");
    iframeProyecto.src = "";
});

// ================================
// FUNCIONES LOCALSTORAGE (DESBLOQUEOS)
// ================================
function guardarProgreso(clave) {
    localStorage.setItem(clave, "true");
    verificarDesbloqueos();
}

function verificarDesbloqueos() {
    const sanValentin = localStorage.getItem("sanValentin") === "true";
    const carta = localStorage.getItem("carta") === "true";
    const juego = localStorage.getItem("juego") === "true";
    const tiempoFinalizado = localStorage.getItem("tiempoFinalizado") === "true";

    if (sanValentin) {
        btnCarta.disabled = false;
    }

    if (carta) {
        btnJuego.disabled = false;
    }

    if (sanValentin && carta && juego && tiempoFinalizado) {
        btnRegalo.disabled = false;
    }
}

// ================================
// CONTADOR
// ================================
function actualizarContador() {
    const ahora = new Date();
    const diferencia = fechaSanValentin - ahora;

    if (diferencia <= 0) {
        tiempo.innerHTML = "🎉 ¡Ya es San Valentín! Ya puedes ver todo 💖";

        // Guardar que el tiempo terminó
        localStorage.setItem("tiempoFinalizado", "true");

        verificarDesbloqueos();
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    diasElemento.textContent = dias.toString().padStart(2, "0");
    horasElemento.textContent = horas.toString().padStart(2, "0");
    minutosElemento.textContent = minutos.toString().padStart(2, "0");
    segundosElemento.textContent = segundos.toString().padStart(2, "0");
}

// Ejecutar contador
setInterval(actualizarContador, 1000);
actualizarContador();

// ================================
// EVENTOS BOTONES PRINCIPALES
// ================================
btnSanValentin.addEventListener("click", () => {
    abrirProyecto("San valentin mensaje/index.html");
    guardarProgreso("sanValentin");
});

btnCarta.addEventListener("click", () => {
    abrirProyecto("Carta de Amor/index.html");
    guardarProgreso("carta");
});

btnJuego.addEventListener("click", () => {
    abrirProyecto("Encuentra las parejas/index.html");
    guardarProgreso("juego");
});

// ================================
// MODAL REGALO (A PRUEBA DE ERRORES)
// ================================
const modalRegalo = document.getElementById("modalRegalo");
const cerrarRegalo = document.getElementById("cerrarRegalo");
const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");
const mensajeFinal = document.getElementById("mensajeFinal");
const imgRegalo = document.getElementById("imgRegalo");

const cancionFeliz = document.getElementById("cancionFeliz");
const cancionTriste = document.getElementById("cancionTriste");

// Si existen los elementos del regalo, entonces sí asignamos eventos
if (modalRegalo && cerrarRegalo && btnSi && btnNo && mensajeFinal && imgRegalo && cancionFeliz && cancionTriste) {

    btnRegalo.addEventListener("click", () => {
        modalRegalo.classList.remove("oculto");
    });

    cerrarRegalo.addEventListener("click", () => {
        modalRegalo.classList.add("oculto");
        reiniciarRegalo();
    });

    btnSi.addEventListener("click", () => {
        detenerCanciones();

        mensajeFinal.classList.remove("oculto");
        mensajeFinal.innerHTML = "💖 Con mucho amor para ti... Feliz San Valentín 💝✨";

        cancionFeliz.play();
        imgRegalo.src = "imagenes/regaloAbierto.png";
    });

    btnNo.addEventListener("click", () => {
        detenerCanciones();

        mensajeFinal.classList.remove("oculto");
        mensajeFinal.innerHTML = "😢 Ay no... eso me puso triste...";

        cancionTriste.play();
        imgRegalo.src = "imagenes/triste.png";
    });

    function detenerCanciones() {
        cancionFeliz.pause();
        cancionFeliz.currentTime = 0;

        cancionTriste.pause();
        cancionTriste.currentTime = 0;
    }

    function reiniciarRegalo() {
        detenerCanciones();
        mensajeFinal.classList.add("oculto");
        imgRegalo.src = "imagenes/regalo.png";
    }

} else {
    console.warn("⚠️ No se encontró el modal del regalo o sus elementos. Revisa el HTML.");
}

// Ejecutar desbloqueos al cargar
verificarDesbloqueos();
