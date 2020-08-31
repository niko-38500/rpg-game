class Ennemies {
    constructor(nom, sante, attaque, xp){
        this.nom        = nom;
        this.sante      = Number(sante)
        this.attaque    = Number(attaque);
        this.xp         = Number(xp);
    }
}

class Rat extends Ennemies{
    constructor(){
        super("rat d'egoutant", 400, 40, 50);
    }
}

var ennemie = new Rat;

class Personnage {
    constructor(xp){
        this.xp    = xp;
        this.xpMax = 150;
    }
}

class Guerrier extends Personnage {
    constructor(){
        super(50);
    }
}

var hero = new Guerrier;

$('#ennemie .description_ennemie').html("<p>nom : " + ennemie.nom + "</p> <br /> <br /> <p>point de vie : " + ennemie.sante + "</p>");

var bar = hero.xp * 100 / hero.xpMax;

console.log(bar)

// function progresBar() {
//     $("#personnage #barre_xp span").css("width", bar);
// }

console.log(ennemie);
console.log(hero);