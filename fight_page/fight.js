var hero = JSON.parse(localStorage.getItem("hero"));
console.log(hero.informations)

if (hero.classe == "guerrier") {
    $("#icone_hero").attr("src", "../personnage/guerrier.png");
} else if (hero.classe == "magicien") {
    $("#icone_hero").attr("src", "../personnage/mage.png");
}


let infoHero = JSON.parse(localStorage.getItem("hero_info"));

$("#personnage span:eq(1)").html(infoHero);
$("#personnage span:eq(1)").css("margin-top", "12px");

setInterval(function () {
    $(".barre_sante").text(hero.sante + "/" + hero.santeMax);
    $(".barre_sante").css("width", hero.sante * 100 / hero.santeMax + "%");

    $(".barre_magie").text(hero.magie + "/" + hero.magieMax);
    $(".barre_magie").css("width", hero.magie * 100 / hero.magieMax + "%");
}, 200);

class Ennemies {
    constructor(nom, sante, attaque, xp){
        this.nom        = nom;
        this.sante      = Number(sante)
        this.attaque    = Number(attaque);
        this.xp         = Number(xp);
    }

    verifierSante(){
        if (this.sante <= 0) {
            this.sante = 0;
            alert("il reste " + this.sante + " point de vie a " + this.nom + " vous avez gagner bravo");
            hero.verifierXp();
            menu();
        }

    }

    get informations() {
        return ennemie.nom + "\n pdv : " + ennemie.sante;
    }
}

class Rat extends Ennemies{
    constructor(){
        super("rat d'egoutant", 400, 40, 50);
    }

    attaquer(hero){
        hero.sante -= this.attaque;
        alert(`${this.nom} vous inflige ${ennemie.attaque} point de degat, il vous reste ${hero.sante} point de vie`);
        hero.verifierSante();
    }
}

$("#menu").click(function() {
    hero.sante -= 1;
    localStorage.setItem("hero", JSON.stringify(hero));
});