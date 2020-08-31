var ennemie;

var hero;

class Personnage {
    constructor(pseudo, classe, sante, santeMax, attaque, niveau, xp, xpUp){
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
        let nouvelleXp = ennemie.xp + this.xp;
        this.xp = nouvelleXp
        alert(`vous avez ${this.xp} sur ${this.xpUp} point d'experiance`)
        if (this.xp >= this.xpUp) {
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

function menu() {
    let choix = Number(prompt("bienvenue dans le menu que voulez vous faire ? \n\n 1 - combattre \n 2 - inventaire"));

    switch(choix){
        case 1:
            let typeEnnemie = Number(prompt("choisissez votre adversaire \n\n 1 - Rat d'égoutant"));
                switch(typeEnnemie){
                    case 1:
                        ennemie = new Rat();
                        break;
                }
            combat();
            break;
        case 2:
            alert('pas encore implementer')
            menu();
    }
}

function combat() {
    while(hero.sante > 0 && ennemie.sante > 0){
        let choix = Number(prompt(`${ennemie.informations}\n ${hero.pseudo} : ${hero.sante} \n\n1 - attaqué \n 2 - se defendre`));
        switch(choix){
            case 1:
                hero.attaquer(ennemie);
                if(ennemie.sante <= 0){
                    console.log(hero.verifierXp());
                } else {
                    ennemie.attaquer(hero);
                }
            case 2:
                Math.floor(hero.sante / 0.85);
        }
    }
}

Personnage.classe = Number(prompt("choisisez une classe \n\n 1 - magicien \n 2 - guerrier"));

switch (Personnage.classe) {
    case 1:
        hero = new Magicien(Personnage.pseudo);
        break;
    case 2:
        hero = new Guerrier(Personnage.pseudo);
} 

hero.pseudo = prompt("tapez un pseudo");

console.log(ennemie);

alert(`bienvenue ${hero.pseudo} vous etes un ${hero.classe}`);

menu();




