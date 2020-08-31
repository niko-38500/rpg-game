class Ennemies {
    constructor(nom, sante, attaque, xp){
        thr(xp);
    }
}
uctor(pseudo, classe, sante, santeMax, attaque, niveau, xp, xpUp){
        this.pseudo            = pseudo;
        this.classe            = classe;
        this.sante             = Number(sante);
        this.santeMax          = Number(santeMax);
        this.attaque           = Number(attaque);
        this.niveau            = 1;
        this.xp                = 0;
        this.xpUp              = 150;
    }

    verifierXp() {
        let nouvelthis.xpUp) {
            this.xp = 0;
            hero.evoluer();
        }
    }

    evoluer(){
        this.niveau   ++;
        this.attaque  ++;
        this.santeMax += 5;
        hero.sante = hero.santeMax;
        alert(`${this.pseudo} passe au niveau ${this.niveau}, gagne 1 point attaque 
        (attaque total ${this.attaque}) et 5 point de sante (santé total ${this.sante})`);
    }

    verifierSante(){
        if (this.sante <= "0") {
            this.sante = 0;
            alert("GAME OVER");
            menu();
        }
    }

    get informations() {
        return this.pseudo + " (" + this.classe + ") " + "a " + this.sante + " point de vie et est au niveau " + this.niveau;
    }
}

class Magicien extends Personnage{
    constructor(pseudo){
        super(pseudo, "magicien", 17000, 17000, 300)
    }

    attaquer(ennemie){
        ennemie.sante -= this.attaque;
        alert(this.pseudo + " attaque " + ennemie.nom + " en lancant un sort et inflige " + this.attaque + " point de degat.")
        ennemie.verifierSante();
    }

    attaqueSpecial(ennemie) {
        ennemie.sante -= (this.attaque * 5);
        alert(this.pseudo + " attaque " + ennemie.nom + " avec son coup spéciale et inflige " + (this.attaque * 5) + " point de degat.")
        this.evoluer();
        ennemie.verifierSante();
    }
}

class Guerrier extends Personnage {
    constructor(pseudo){
        super(pseudo, "guerrier", 500, 500, 500)
    }

    attaquer(ennemie){
        ennemie.sante -= this.attaque;
        alert(this.pseudo + " attaque " + ennemie.nom + " avec son epée et inflige " + this.attaque + " point de degat.")
        ennemie.verifierSante();
    }

    attaqueSpecial(ennemie) {
        ennemie.sante -= (this.attaque * 5);
        alert(this.pseudo + " attaque " + ennemie.nom + " avec son coup spéciale et inflige " + (this.attaque * 5) + " point de degat.")
        this.evoluer();
        ennemie.verifierSante();
    }
}

var ennemie = new Rat;

$('#ennemie .description_ennemie').html("<p>nom : " + ennemie.nom + "</p> <br /> <br /> <p>point de vie : " + ennemie.sante + "</p>");

// var pourcentXp = Math.floor(hero.xp * 100 / hero.xpMax);

// function progresBar() {
//     $("#personnage #barre_xp span").css("width", `${pourcentXp}%`);
// }

// progresBar();

if (localStorage.getItem("classe") == "magicien") {
    hero = new Magicien;
} else if (localStorage.getItem("classe") == "guerrier") {
    hero = new Guerrier;
}
let pseudo = localStorage.getItem("pseudo");

hero.pseudo = pseudo;

console.log(hero);