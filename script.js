const text = document.querySelector(".text");
const secretDiv = document.querySelector(".secret-div");
const mainDiv = document.querySelector("#maindiv");
const keys = [];
const secretCode = ["b", "h", "a", "v", "i"];

const confettiSettings = { target: "my-canvas", size: 1, max: 150 };
const confetti = new ConfettiGenerator(confettiSettings);

function keysDetector(e) {
  console.log(e.key); //check which key got pressed in the console

  keys.push(e.key);
  if (keys.length > secretCode.length) {
    keys.shift();
  }

  if (JSON.stringify(keys) === JSON.stringify(secretCode)) {
    secretDiv.style.display = "block";
    mainDiv.style.display = "none";
    text.innerHTML = "Identity Verified!";
    confetti.render();
    anime({
      targets: "body",
      rotate: "2turn",
      backgroundColor: "#DC143C",
      duration: 3000,
    });
  }
}

window.addEventListener("keyup", keysDetector);

// MEME CREATION CODE
function generateMeme(img, topText, bottomText, topTextSize, bottomTextSize) {
  const canvas = document.getElementById("meme-canvas");
  const ctx = canvas.getContext("2d");

  // Size canvas to image
  canvas.width = img.width;
  canvas.height = img.height;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw main image
  ctx.drawImage(img, 0, 0);

  // Text style: white with black borders
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";

  // Top text font size
  let fontSize = canvas.width * topTextSize;
  ctx.font = `${fontSize}px Impact`;
  ctx.lineWidth = fontSize / 20;

  // Draw top text
  ctx.textBaseline = "top";
  topText.split("\n").forEach((t, i) => {
    ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
    ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
  });

  // Bottom text font size
  fontSize = canvas.width * bottomTextSize;
  ctx.font = `${fontSize}px Impact`;
  ctx.lineWidth = fontSize / 20;

  // Draw bottom text
  ctx.textBaseline = "bottom";
  bottomText
    .split("\n")
    .reverse()
    .forEach((t, i) => {
      // .reverse() because it's drawing the bottom text from the bottom up
      ctx.fillText(
        t,
        canvas.width / 2,
        canvas.height - i * fontSize,
        canvas.width
      );
      ctx.strokeText(
        t,
        canvas.width / 2,
        canvas.height - i * fontSize,
        canvas.width
      );
    });
}

window.addEventListener("DOMContentLoaded", (event) => {
  // Initialize variables
  const topTextInput = document.getElementById("top-text");
  const bottomTextInput = document.getElementById("bottom-text");
  const topTextSizeInput = document.getElementById("top-text-size-input");
  const bottomTextSizeInput = document.getElementById("bottom-text-size-input");
  const imageInput = document.getElementById("image-input");
  const generateBtn = document.getElementById("generate-btn");

  // Generate button click listener
  generateBtn.addEventListener("click", () => {
    // Read image as DataURL using the FileReader API
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        generateMeme(
          img,
          topTextInput.value,
          bottomTextInput.value,
          topTextSizeInput.value,
          bottomTextSizeInput.value
        );
      };
    };
    console.log(imageInput.files[0]);
    reader.readAsDataURL(imageInput.files[0]);
  });
});

// toggle
const toggle = document.getElementById("toggle");
toggle.addEventListener("click", () => {
  secretDiv.style.display = "none";
  mainDiv.style.display = "block";
});