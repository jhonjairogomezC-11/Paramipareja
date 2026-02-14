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


const modalRegalo = document.getElementById("modalRegalo");
const cerrarRegalo = document.getElementById("cerrarRegalo");
const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");
const mensajeFinal = document.getElementById("mensajeFinal");
const cancionFeliz = document.getElementById("cancionFeliz");
const cancionTriste = document.getElementById("cancionTriste");


// Obtener elementos (con validación)
const modalContrasena = document.getElementById("modalContrasena");
const inputContrasena = document.getElementById("inputContrasena");
const btnConfirmarContrasena = document.getElementById("btnConfirmarContrasena");
const btnCancelarContrasena = document.getElementById("btnCancelarContrasena");
const errorContrasena = document.getElementById("errorContrasena");
const CONTRASENA_CORRECTA = "burbuja";



// Fecha objetivo: 14 de febrero 2026 (00:00)
const fechaSanValentin = new Date(Date.now() - 1000);


// PARA PRUEBAS: Descomenta la siguiente línea para simular que ya es San Valentín
// const fechaSanValentin = new Date(Date.now() - 1000); // Hace que el tiempo ya haya pasado

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
        // Mostrar todos los valores en 00
        diasElemento.textContent = "00";
        horasElemento.textContent = "00";
        minutosElemento.textContent = "00";
        segundosElemento.textContent = "00";
        
        // Desbloquear TODOS los botones cuando llegue San Valentín
        btnCarta.disabled = false;
        btnJuego.disabled = false;
        btnRegalo.disabled = false;
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












// Evento para abrir el modal del regalo (requiere contraseña)
btnRegalo.addEventListener("click", () => {
    console.log("Click en botón regalo detectado");
    modalContrasena.classList.remove("oculto");
    inputContrasena.value = "";
    if (errorContrasena) {
        errorContrasena.classList.add("oculto");
    }
    setTimeout(() => {
        inputContrasena.focus();
    }, 100);
});






// Cerrar modal del regalo
cerrarRegalo.addEventListener("click", () => {
    modalRegalo.classList.add("oculto");
    mensajeFinal.classList.add("oculto");
    cancionFeliz.pause();
    cancionTriste.pause();
    cancionFeliz.currentTime = 0;
    cancionTriste.currentTime = 0;
});




// Respuesta "Sí" - reproduce canción inmediatamente y cuenta regresiva de 75 segundos
btnSi.addEventListener("click", () => {
    // Pausar canción triste por si acaso
    cancionTriste.pause();
    cancionTriste.currentTime = 0;
    
    // Reproducir canción feliz INMEDIATAMENTE
    cancionFeliz.currentTime = 0;
    cancionFeliz.play();
    
    // Crear elemento de cuenta regresiva desde 75 segundos
    let contador = 75;
    mensajeFinal.innerHTML = `<div class="cuenta-regresiva">${contador}</div>`;
    mensajeFinal.classList.remove("oculto");
    
    // Deshabilitar botones durante la cuenta regresiva
    btnSi.disabled = true;
    btnNo.disabled = true;
    
    // Iniciar cuenta regresiva
    const intervalo = setInterval(() => {
        contador--;
        if (contador > 0) {
            mensajeFinal.innerHTML = `<div class="cuenta-regresiva">${contador}</div>`;
        } else {
            clearInterval(intervalo);
            // Mostrar mensaje final cuando llegue a 0
            mensajeFinal.innerHTML = "¡Eso me hace tan feliz! 💖😊 ¡Te amo mucho!";
            // Rehabilitar botones
            btnSi.disabled = false;
            btnNo.disabled = false;
        }
    }, 1000);
});

// Respuesta "No"
btnNo.addEventListener("click", () => {
    mensajeFinal.textContent = "Ay no 😢💔 Ya no mereces tu regalo.";
    mensajeFinal.classList.remove("oculto");
    cancionFeliz.pause();
    cancionTriste.play();
});

// ========== FUNCIONES DE CONTRASEÑA ==========

// Función para verificar contraseña
function verificarContrasena() {
    if (!inputContrasena || !modalContrasena || !modalRegalo) return;
    
    const contrasenaIngresada = inputContrasena.value.trim().toLowerCase();
    
    if (contrasenaIngresada === CONTRASENA_CORRECTA) {
        // Contraseña correcta
        modalContrasena.classList.add("oculto");
        modalRegalo.classList.remove("oculto");
        inputContrasena.value = "";
        if (errorContrasena) {
            errorContrasena.classList.add("oculto");
        }
    } else {
        // Contraseña incorrecta
        if (errorContrasena) {
            errorContrasena.textContent = "❌ Contraseña incorrecta. Intenta de nuevo.";
            errorContrasena.classList.remove("oculto");
        }
        inputContrasena.value = "";
        inputContrasena.focus();
    }
}

// Eventos de contraseña
if (btnConfirmarContrasena) {
    btnConfirmarContrasena.addEventListener("click", verificarContrasena);
}

if (inputContrasena) {
    inputContrasena.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            verificarContrasena();
        }
    });
}

if (btnCancelarContrasena && modalContrasena) {
    btnCancelarContrasena.addEventListener("click", () => {
        modalContrasena.classList.add("oculto");
        if (inputContrasena) {
            inputContrasena.value = "";
        }
        if (errorContrasena) {
            errorContrasena.classList.add("oculto");
        }
    });
}