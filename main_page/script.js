var hero;
var pseudo;
let input = document.querySelector("#pseudo");
let magicien = document.querySelector("#magicien");
let guerrier = document.querySelector("#guerrier");
input.addEventListener("change", () => {
    pseudo = input.value;
});

magicien.addEventListener("click", () => {
    hero = new Magicien(pseudo);
    localStorage.setItem("hero", JSON.stringify(hero));
});

guerrier.addEventListener("click", () => {
    hero = new Guerrier(pseudo);
    localStorage.setItem("hero", JSON.stringify(hero));
});
