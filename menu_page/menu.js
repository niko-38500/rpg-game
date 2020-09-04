var hero = JSON.parse(localStorage.getItem("hero"));

if (hero.classe == "guerrier") {
    $("#icone_hero").attr("src", "../personnage/guerrier.png");
    hero = new RecoverGuerrier;
} else if (hero.classe == "magicien") {
    $("#icone_hero").attr("src", "../personnage/mage.png");
    hero = new RecoverMagicien;
}

$("#personnage span:eq(1)").html(hero.informations);
$("#personnage span:eq(1)").css("margin-top", "12px");

setInterval(function () {
    $(".barre_sante").text(hero.sante + "/" + hero.santeMax);
    $(".barre_sante").css("width", hero.sante * 100 / hero.santeMax + "%");

    $(".barre_magie").text(hero.magie + "/" + hero.magieMax);
    $(".barre_magie").css("width", hero.magie * 100 / hero.magieMax + "%");
}, 200);



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

