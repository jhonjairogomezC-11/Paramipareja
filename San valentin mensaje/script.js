let attempts = 0;
let yesSelected = false;

const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const responseMessage = document.getElementById("responseMessage");
const questionText = document.querySelector("#question p");

const loveQuotes = [
  "Contigo quiero ser mejor. 💖",
  "No sé decirlo bonito, pero me encantas demasiado. 😍",
  "No soy romántico… pero contigo me nace intentarlo. 💘",
  "Tú eres mi parte favorita del día. ❤",
  "Si es contigo, yo sí le hago. "
];

// Función que mueve el botón NO aleatoriamente
function moveNoButton() {
  const container = document.querySelector(".container");
  const containerRect = container.getBoundingClientRect();

  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  const randomX = Math.random() * (containerRect.width - buttonWidth);
  const randomY = Math.random() * (containerRect.height - buttonHeight);

  noButton.style.position = "absolute";
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
}

// Evento cuando se pasa el mouse encima (PC)
noButton.addEventListener("mouseover", () => {
  moveNoButton();
});

// Evento cuando se intenta tocar (móvil)
noButton.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Cuando presiona el botón SÍ
yesButton.addEventListener("click", () => {

  if (yesSelected) return;

  const randomIndex = Math.floor(Math.random() * loveQuotes.length);
  responseMessage.innerHTML = loveQuotes[randomIndex];

  responseMessage.style.display = "block";

  yesSelected = true;
  noButton.disabled = true;

  yesButton.style.background = "#ff4081";
  yesButton.innerHTML = "SÍ 💖";

  questionText.innerHTML = "Sabía que ibas a decir que sí 😏❤";
});

// Cuando presiona el botón NO
noButton.addEventListener("click", () => {

  if (yesSelected) return;

  if (attempts === 0) {
    responseMessage.innerHTML = "Ey no... esa no era 😭 intenta otra vez.";
  } else if (attempts === 1) {
    responseMessage.innerHTML = "¿Otra vez NO? No mientas 😏";
  } else if (attempts === 2) {
    responseMessage.innerHTML = "Pista: empieza por 'S' y termina en 'I' 💖";
  } else {
    responseMessage.innerHTML = "Ya no te dejo escoger... solo puedes decir SÍ 😈❤";
  }

  responseMessage.style.display = "block";

  moveNoButton();
  attempts++;
});
