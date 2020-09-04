var inventory = {
    potion: [],
    weapon: [],
    shield: [],
    armor: []
}

// methode inventaire

class Item {
 
    constructor(name) {
        this.element      = document.createElement('div');
        this.content      = document.createElement("p");
        this.element.appendChild(this.content);
        this.name         = name;
        this.btnUse       = document.createElement('button');
        this.btnDelete    = document.createElement('button');
        this.btnEquip     = document.createElement('button');
        this.btnPlaceRune = document.createElement('button');
        return this;
    }
  
    delete() {
        if (confirm("voulez vous supprimer cet objet ?")){
            let itemType = Object.getPrototypeOf(this).constructor.name.toLowerCase();
            this.element.remove();
            this.btnEquip.remove();
            this.btnDelete.remove();
            this.btnUse.remove();
            this.btnPlaceRune.remove();
            inventory[itemType].splice(inventory[itemType].indexOf(this), 1);
        }
    }

    addInventory() {
        let itemType = Object.getPrototypeOf(this).constructor.name.toLowerCase();
        console.log(this);
        document.querySelector("#inventory").appendChild(this.element);
        inventory[itemType].push(this);
        localStorage.setItem("inventory", JSON.stringify(inventory));
        
        if (Object.getPrototypeOf(this).constructor.name.toLowerCase() != "potion") {
            let equip = this.btnEquip;
            equip.innerHTML = "equiper";
            this.element.appendChild(equip);
            equip.addEventListener("click", () => {
                if (hero["recover" + itemType] == false){
                    this.equipItem();
                } else {
                    this.unequipItem();
                }
            });

            let placeRune = this.btnPlaceRune;
            placeRune.innerHTML = "placer rune";
            this.element.appendChild(placeRune);
        } else {
            let drinkPotion = this.btnUse;
            drinkPotion.innerHTML = "boire potion";
            this.element.appendChild(drinkPotion);
            drinkPotion.addEventListener("click", () => {this.consume()});
        }

        let remove = this.btnDelete;
        remove.innerHTML  = "supprimer";
        this.element.appendChild(remove);
        remove.addEventListener("click", () => {this.delete()});
    }

    equipItem () {
        if (Object.getPrototypeOf(this).constructor.name.toLowerCase() != "potion") {
            if (Object.getPrototypeOf(this).constructor.name.toLowerCase() === "weapon"){
                if (hero.recoverweapon === false) {
                    if (hero.recovershield != false && this.type === "two-handed") {
                        alert("vous ne pouvez pas equiper une arme a deux main quand vous portez un bouclier");
                    } else {
                        hero.attaque += this.value;
                        hero.recoverweapon = this;
                        hero.recoverweapon.equiped = true
                        this.content.prepend("E  ");
                        this.btnEquip.innerHTML = "desequiper";
                    }
                } else {
                    // ne rien faire
                }
            } else if (Object.getPrototypeOf(this).constructor.name.toLowerCase() == "armor") {
                if (hero.recoverarmor === false) {
                    hero.santeMax += this.value;
                    hero.sante += this.value;
                    hero.recoverarmor = this;
                    hero.recoverarmor.equiped = true;
                    this.content.prepend("E  ");
                    this.btnEquip.innerHTML = "desequiper";
                }
            } else if (Object.getPrototypeOf(this).constructor.name.toLowerCase() == "shield") {
                if (hero.recovershield === false && hero.recoverweapon.type != "two-handed"){
                    hero.santeMax += this.value;
                    hero.sante += this.value;
                    hero.recovershield = this;
                    hero.recovershield.equiped = true;
                    this.content.prepend("E  ");
                    this.btnEquip.innerHTML = "desequiper";
                } else {
                    alert("vous ne pouvez equiper un bouclier quand vous portez une arme a deux main");
                }
            }
        }
        localStorage.setItem("inventory", JSON.stringify(inventory));
    }

    unequipItem () {
        console.log("abc");
        if (Object.getPrototypeOf(this).constructor.name.toLowerCase() == "weapon"){
            if(hero.recoverweapon === this && hero.recoverweapon.equiped === true) {
                hero.attaque -= this.value;
                hero.recoverweapon.equiped = false;
                hero.recoverweapon = false;
                this.content.innerHTML = this.description;
                this.btnEquip.innerHTML = "equiper";
            }
        } else if (Object.getPrototypeOf(this).constructor.name.toLowerCase() == "armor") {
            if (hero.armor === this && hero.armor.equiped === true){
                hero.santeMax -= this.value;
                hero.sante -= this.value;
                hero.armor.equiped = false;
                hero.armor = false;
                this.content.innerHTML = this.description;
                this.btnEquip.innerHTML = "equiper";
            } 
        } else if (Object.getPrototypeOf(this).constructor.name.toLowerCase() == "shield") {
            if (hero.recovershield === this && hero.recovershield.equiped === true){
                hero.santeMax -= this.value;
                hero.sante -= this.value;
                hero.recovershield.equiped = false;
                hero.recovershield = false;
                this.content.innerHTML = this.description;
                this.btnEquip.innerHTML = "equiper";
            }
        } 
        localStorage.setItem("inventory", JSON.stringify(inventory));
    }
        
}
  
class Potion extends Item {
  
    constructor(name, effect, value) {
        super(name);
        this.effect            = effect;
        this.value             = value;
        this.content.innerText = this.description;
        return this;
    }

    get description() {
        return this.name + ' : ' + this.value + ' point de ' + this.effect + " ";
    }
  
    consume() {
        if (this.effect == "soin") {
            if(hero.sante < hero.santeMax) {
                hero.sante += this.value;
                alert("vous avez bu une potion cela vous fait du bien vous regagnez " + this.value + " point de vie");
                this.delete();
                if (hero.sante > hero.santeMax){
                    hero.sante = hero.santeMax;
                }
            } else {
                alert("vous avez deja tout vos point de vie !")
            }
        } else if (this.effect == "magie") {
            if(hero.magie < hero.magieMax) {
                hero.magie += this.valeur;
                alert("vous avez bu une potion cela vous fait du bien vous regagnez " + this.value + " point de magie");
                this.delete();
                if (hero.magie > hero.magieMax){
                    hero.magie = hero.magieMax;
                }
            } else {
                alert("vous avez deja toutes votre magie")
            }
        }
    }
  
}

class Weapon extends Item {
  
    constructor(name, type, value, effect, valueEffect) {
        super(name);
        this.type              = type;
        this.value             = value;
        this.effect            = effect;
        this.valueEffect       = valueEffect;
        this.content.innerText = this.description;
        this.equiped           = false;
        return this;
    }

    get description() {
        return this.name + ' : ' + this.value + ' point de dégat';
    }
  
}

class Shield extends Item {
  
    constructor(name, value, effect, valueEffect) {
        super(name);
        this.value             = value;
        this.effect            = effect;
        this.valueEffect       = valueEffect;
        this.content.innerText = this.description;
        this.equiped           = false;
        return this;
    }

    get description() {
        return this.name + ' : + ' + this.value + ' point de vie';
    }
  
}

class Armor extends Item {
  
    constructor(name, type, value, effect, valueEffect) {
        super(name);
        this.type              = type;
        this.value             = value;
        this.effect            = effect;
        this.valueEffect       = valueEffect;
        this.content.innerText = this.description;
        this.equiped           = false; 
        return this;
    }

    get description() {
        return this.name + ' : + ' + this.value + ' point de vie';
    }
  
}

// Items

    // potion 

        // potion de soin

        var petitePotionDeSoin     = new Potion("petite potion de soin", "soin", 75);
        var moyennePotionDeSoin    = new Potion("moyenne potion de soin", "soin", 150);
        var puissantePotionDeSoin  = new Potion("puissante potion de soin", "soin", 400);

        // potion de magie

        var petitePotionDeMagie    = new Potion("petite potion de magie", "magie", 75);
        var moyennePotionDeMagie   = new Potion("moyenne potion de magie", "magie", 150);
        var puissantePotionDeMagie = new Potion("puissante potion de magie", "magie", 400);

    // arme

        // epee

        var epeeEnBois     = new Weapon('epée en bois', "epee", 150, "emoragie", 5);
        var epeeEnFer      = new Weapon("epee en fer", "epee", 300, "emoragie", 15);
        var epeeEnAcier    = new Weapon("epee en acier", "epee", 600, "emoragie", 25);
        var epeeLegendaire = new Weapon("epée légendaire", "epee", 1200, "feu", 150);

        // hache

        var hacheDuDébutant    = new Weapon("hache du débutant", "two-handed", 175, "contandant", 5 + "%");
        var hacheDuGuerrier    = new Weapon("hache du guerrier", "two-handed", 340, "contandant", 15 + "%");
        var hacheDuLegionnaire = new Weapon("hache du légionnaire", "two-handed", 650, "contandant", 25 + "%");
        var hacheLegendaire    = new Weapon("hache légendaire", "two-handed", 1280, "glace", 200);

    // bouclier

    var bouclierEnBois     = new Shield("bouclier en bois", 25);
    var bouclierEnFer      = new Shield("bouclier en fer", 45);
    var bouclierEnAcier    = new Shield("bouclier en acier", 80);
    var bouclierLegendaire = new Shield("bouclier légendaire", 150);

    // armure (ajouter plus tard plus d'armure legere, moyenne et lourde)

    var armureEntrainement = new Armor("armure d'entrainement", "armure légere", 90, "rune", false);
    var armureEnAcier      = new Armor("armure en acier", "armure moyenne", 180, "rune", true);
    var armureDraconique   = new Armor("armure draconique", "armure lourde", 300, "rune", true);
    var armureLegendaire   = new Armor("armure légendaire", "armure moyenne", 500, "rune", true);

