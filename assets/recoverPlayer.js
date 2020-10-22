var dialogue = document.querySelector("#boite_de_dialogue");

    class RecoverPersonnage {
        constructor(pseudo, classe, sante, santeMax, attaque, magie, magieMax){
            this.pseudo        = pseudo;
            this.classe        = classe;
            this.sante         = Number(sante);
            this.santeMax      = Number(santeMax);
            this.attaque       = Number(attaque);
            this.magie         = Number(magie);
            this.magieMax      = Number(magieMax)
            this.niveau        = hero.niveau;
            this.xp            = hero.xp;
            this.xpUp          = hero.xpUp;
            this.recoverarmor  = hero.armor; 
            this.recoverweapon = hero.weapon;
            this.recovershield = hero.shield;
        }
    
        verifierXp() {
            let nouvelleXp = ennemie.xp + this.xp;
            this.xp = nouvelleXp
            dialogue.append(`vous avez ${this.xp} sur ${this.xpUp} point d'experiance`)
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
                let gameOver = prompt("GAME OVER \n\n1 - recommancer \n2 - retour à la taverne");
                switch(gameOver){
                    case 1:
                        document.location.reload();
                        break;
                    case 2:
                        window.location.href ="file:///C:/Users/nicolas/Documents/git-storage/rpg-game/menu_page/menu.html"
                }
                
            }
        }
    
        get informations() {
            return "<h2>Nom : " + this.pseudo + "</h2><br /> <h2>Niveau : " + this.niveau + "</h2>"
        }
    }
    
    class RecoverMagicien extends RecoverPersonnage{
        constructor(){
            super(hero.pseudo, hero.classe, hero.sante, hero.santeMax, hero.attaque, hero.magie, hero.magieMax)
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
    
    class RecoverGuerrier extends RecoverPersonnage {
        constructor(){
            super(hero.pseudo, hero.classe, hero.sante, hero.santeMax, hero.attaque, hero.magie, hero.magieMax)
        }
    
        attaquer(ennemie){
            ennemie.sante -= this.attaque;
            dialogue.append(this.pseudo + " attaque " + ennemie.nom + " avec son epée et inflige " + this.attaque + " point de degat.")
            ennemie.verifierSante();
        }
    
        attaqueSpecial(ennemie) {
            ennemie.sante -= (this.attaque * 5);
            dialogue.append(this.pseudo + " attaque " + ennemie.nom + " avec son coup spéciale et inflige " + (this.attaque * 5) + " point de degat.")
            this.evoluer();
            ennemie.verifierSante();
        }
    }

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