var dialogue = document.querySelector("#boite_de_dialogue");

class Ennemies {
    constructor(nom, sante, santeMax, attaque, xp){
        this.nom      = nom;
        this.sante    = Number(sante);
        this.santeMax = Number(santeMax)
        this.attaque  = Number(attaque);
        this.xp       = Number(xp);
    }

    verifierSante(){
        if (this.sante <= 0) {
            this.sante = 0;
            dialogue.prepend("il reste " + this.sante + " point de vie a " + this.nom + " vous avez gagner bravo");
            hero.verifierXp();
            if(confirm("Bravo vous avez vaincu votre adversaire, voulez vous l'affronté une nouvelle fois ?")){
                window.location.reload();
            }else {
                window.location.href ="file:///C:/Users/nicolas/Documents/git-storage/rpg-game/menu_page/menu.html"
            }
        }

    }

    get informations() {
        return ennemie.nom + "\n pdv : " + ennemie.sante;
    }
}

class Rat extends Ennemies{
    constructor(){
        super("rat d'egoutant", 400, 400, 40, 50);
    }

    attaquer(hero){
        hero.sante -= this.attaque;
        dialogue.prepend(`${this.nom} vous inflige ${ennemie.attaque} point de degat, il vous reste ${hero.sante} point de vie`);
        hero.verifierSante();
    }
}

class Bandit extends Ennemies{
    constructor(){
        super("bandit crasseux", 1500, 1500, 150, 270);
    }

    attaquer(hero){
        hero.sante -= this.attaque;
        dialogue.prepend(`${this.nom} vous inflige ${ennemie.attaque} point de degat, il vous reste ${hero.sante} point de vie`);
        hero.verifierSante();
    }
}

class Ogre extends Ennemies{
    constructor(){
        super("Ogre des caverenes", 3000, 3000, 200, 550);
    }

    attaquer(hero){
        hero.sante -= this.attaque;
        dialogue.prepend(`${this.nom} vous inflige ${ennemie.attaque} point de degat, il vous reste ${hero.sante} point de vie`);
        hero.verifierSante();
    }
}

class Dragon extends Ennemies{
    constructor(){
        super("Dragon celeste", 15000, 15000, 500, 3000);
    }

    attaquer(hero){
        hero.sante -= this.attaque;
        dialogue.prepend(`${this.nom} vous inflige ${ennemie.attaque} point de degat, il vous reste ${hero.sante} point de vie`);
        hero.verifierSante();
    }
}