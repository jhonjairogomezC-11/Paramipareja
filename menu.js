const btnCarta = document.getElementById("btnCarta");
const btnJuego = document.getElementById("btnJuego");
const btnSanValentin = document.getElementById("btnSanValentin");


const diasElemento = document.getElementById("dias");
const horasElemento = document.getElementById("horas");
const minutosElemento = document.getElementById("minutos");
const segundosElemento = document.getElementById("segundos");

const modal = document.getElementById("modal");
const iframeProyecto = document.getElementById("iframeProyecto");
const cerrarModal = document.getElementById("cerrarModal");

const tiempo = document.getElementById("tiempo");

// Fecha objetivo: 14 de febrero 2026 (00:00)
const fechaSanValentin = new Date("2026-02-14T00:00:00");

// Abrir modal con iframe
function abrirProyecto(ruta) {
    iframeProyecto.src = ruta;
    modal.classList.remove("oculto");
}

// Cerrar modal
cerrarModal.addEventListener("click", () => {
    modal.classList.add("oculto");
    iframeProyecto.src = "";
});

// Función para actualizar el contador y desbloquear botones
function actualizarContador() {
    const ahora = new Date();
    const diferencia = fechaSanValentin - ahora;

    if (diferencia <= 0) {
        tiempo.innerHTML = "🎉 ¡Ya es San Valentín! Ya puedes ver todo 💖";
        btnCarta.disabled = false;
        btnJuego.disabled = false;
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

// Eventos de botones
btnSanValentin.addEventListener("click", () => {
    abrirProyecto("San valentin mensaje/index.html");
});

btnCarta.addEventListener("click", () => {
    abrirProyecto("Carta de Amor/index.html");
});

btnJuego.addEventListener("click", () => {
    abrirProyecto("Encuentra las parejas/index.html");
});
