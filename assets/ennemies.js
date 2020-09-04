var ennemie;

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

class Ogre extends Ennemies{
    constructor(){
        super("Ogre des caverenes", 3000, 200, 550);
    }

    attaquer(hero){
        hero.sante -= this.attaque;
        alert(`${this.nom} vous inflige ${ennemie.attaque} point de degat, il vous reste ${hero.sante} point de vie`);
        hero.verifierSante();
    }
}

class Dragon extends Ennemies{
    constructor(){
        super("Dragon celeste", 15000, 500, 3000);
    }

    attaquer(hero){
        hero.sante -= this.attaque;
        alert(`${this.nom} vous inflige ${ennemie.attaque} point de degat, il vous reste ${hero.sante} point de vie`);
        hero.verifierSante();
    }
}