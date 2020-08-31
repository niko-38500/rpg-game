var hero;

if (localStorage.getItem("classe") == "guerrier") {
    $("#icone_hero").attr("src", "../personnage/guerrier.png");
    hero = new Guerrier;
} else if (localStorage.getItem("classe") == "magicien") {
    $("#icone_hero").attr("src", "../personnage/mage.png");
    hero = new Magicien;
}

hero.pseudo = localStorage.getItem("pseudo");


$("#personnage span:eq(1)").html(hero.informations);
$("#personnage span:eq(1)").css("margin-top", "12px");

setInterval(function () {
    $(".barre_sante").text(hero.sante + "/" + hero.santeMax);
    $(".barre_sante").css("width", hero.sante * 100 / hero.santeMax + "%");

    $(".barre_magie").text(hero.magie + "/" + hero.magieMax);
    $(".barre_magie").css("width", hero.magie * 100 / hero.magieMax + "%");
}, 200);

localStorage.setItem("hero", JSON.stringify(hero));
localStorage.setItem("hero_info", JSON.stringify(hero.informations));

$("#menu").click(function () {
    $("#menu_tavernier").slideToggle();
});

$("#inventory").hide();

$("#shop").click(function () {
    $("#inventory").slideToggle();
});

let fight = document.querySelector("#fight");

fight.addEventListener("click", function() {
    if(confirm("voulez vous partir combattre ?")){
        fight.setAttribute("href", "../fight_page/fight.html")
    }
});


