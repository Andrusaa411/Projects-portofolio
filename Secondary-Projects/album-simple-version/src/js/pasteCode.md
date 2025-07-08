img.addEventListener(`load`, function () {
  document.querySelector(`body`).appendChild(img);
  document.body.removeChild(BTN);
  document.body.style.backgroundImage = `url(${img.src})`;
  document.body.style.backgroundRepeat = "no-repeat"; // Prevent tiling
  document.body.style.backgroundSize = "cover"; // Scale image to cover the screen
  document.body.style.backgroundPosition = "center"; // Center the image
});
