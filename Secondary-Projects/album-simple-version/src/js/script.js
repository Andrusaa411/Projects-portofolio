import * as Config from "./config.js";
import * as Detalii from "./Detalii-album.js";
import { noteAndusa, noteDaniet } from "./main.js";

const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

const changeImg = async function (imgUrl) {
  const img = document.createElement(`img`);
  img.src = await imgUrl;

  img.addEventListener(`load`, function () {
    document.querySelector(`body`).appendChild(img);
    document.body.removeChild(Config.BTN);
    document.body.style.backgroundImage = `url(${img.src})`;
  });

  img.addEventListener("error", function () {
    console.error(`nu s a incarcat imaginea`);
  });
};

const logSongsToConsole = function (songs, persoana) {
  songs.forEach((piesa, index) => {
    setTimeout(
      () => console.log(`${index + 1}. Nota ${piesa} : ${persoana[index]}`),
      index * 250
    );
  });
};

const calcAverage = function (notes) {
  const average = notes.reduce((acc, note) => acc + note, 0);
  return (average / notes.length).toFixed(2);
};

const finalResult = function (score) {
  if (score >= 5 && score < 7)
    console.log(
      `Albumul ${Detalii.album} al artistului ${Detalii.artist} este MID 🤐🤐🤐🤐🐷🐷🐖🐽🐗`
    );

  if (score < 5)
    console.log(
      `Albumul ${Detalii.album} al artistului ${Detalii.artist} este UN GUNOI SI ARTISTUL TREBUIE SA SE SINUCIDA 🧵🧵🧵🧵 `
    );

  if (score >= 7)
    console.log(
      `Albumul ${Detalii.album} al artistului ${Detalii.artist} este CRAZY GOOD 🤑🤑💲💲💯💯🔥🔥 `
    );
};

export const structura = async function (persoana) {
  try {
    changeImg(Detalii.imagine);
    await wait(5.5);
    logSongsToConsole(Detalii.piese, persoana);
    await wait(3);
    console.log(
      `In urmatoarele momente va incepe calcularea mediei notelor...`
    );
    await wait(3);
    console.log(`**SE CALCULEAZA AVERAGEUL NOTELOR OBTINUTE**`);
    await wait(3);
    console.log(
      `Nota finala obtinuta de albumul "${Detalii.album}" al artistului ${Detalii.artist} este ....`
    );
    await wait(5);
    console.log(`🤯🤯🤯🤯🤯🤯`);
    await wait(2.5);
    console.log(`Nota ${calcAverage(persoana)} !!!`);
    await wait(2.5);
    finalResult(calcAverage(persoana));
  } catch (err) {
    console.error(err);
  }
};

Config.BTN.addEventListener(`click`, function () {
  structura(noteAndusa);
  // structura(noteDaniet);
});
