var ennemie = new Rat;

setInterval(function () {
    $(".barre_sante_ennemie").text(ennemie.sante + "/" + ennemie.santeMax);
    $(".barre_sante_ennemie").css("width", ennemie.sante * 100 / ennemie.santeMax + "%");
}, 200);

let btnAttaquer = document.querySelector("#attaque button:nth-child(1)");

btnAttaquer.addEventListener("click", () => {
    hero.attaquer(ennemie);
    ennemie.attaquer(hero);
});