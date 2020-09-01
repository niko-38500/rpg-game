var hero;

class Personnage {
    constructor(pseudo, classe, sante, santeMax, attaque, magie, magieMax){
        this.pseudo   = pseudo;
        this.classe   = classe;
        this.sante    = Number(sante);
        this.santeMax = Number(santeMax);
        this.attaque  = Number(attaque);
        this.magie    = Number(magie);
        this.magieMax = Number(magieMax)
        this.niveau   = 1;
        this.xp       = 0;
        this.xpUp     = 150;
        this.armor    = false; 
        this.weapon   = false;
        this.shield   = false;
    }

    verifierXp() {
        let nouvelleXp = ennemie.xp + this.xp;
        this.xp = nouvelleXp
        alert(`vous avez ${this.xp} sur ${this.xpUp} point d'experiance`)
        if (this.xp >= this.xpUp) {
            this.xp = 0;
            this.xpUp = this.xpUp + this.niveau * 50;
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
        return "<h2>Nom : " + this.pseudo + "</h2><br /> <h2>Niveau : " + this.niveau + "</h2>"
    }
}

class Magicien extends Personnage{
    constructor(pseudo){
        super(pseudo, "magicien", 17000, 17000, 300, 800, 800)
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
        super(pseudo, "guerrier", 500, 500, 300, 200, 200)
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

if (localStorage.getItem("classe") == "guerrier") {
    $("#icone_hero").attr("src", "../personnage/guerrier.png");
    hero = new Guerrier;
} else if (localStorage.getItem("classe") == "magicien") {
    $("#icone_hero").attr("src", "../personnage/mage.png");
    hero = new Magicien;
}