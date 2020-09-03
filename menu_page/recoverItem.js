var potionInCurse;
var weaponInCurse;
var shieldInCurse;
var armorInCurse;

class RecoverItem {
 
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
        console.log(itemType)
        document.querySelector("#inventory").appendChild(this.element);

        if (Object.getPrototypeOf(this).constructor.name.toLowerCase() != "recoverpotion") {
            let equip = this.btnEquip;
            equip.innerHTML = "equiper";
            this.element.appendChild(equip);
            equip.addEventListener("click", () => {
                if (hero[itemType] == false){
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
        if (Object.getPrototypeOf(this).constructor.name.toLowerCase() != "recoverpotion") {
            if (Object.getPrototypeOf(this).constructor.name.toLowerCase() === "recoverweapon"){
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
            } else if (Object.getPrototypeOf(this).constructor.name.toLowerCase() == "recoverarmor") {
                if (hero.recoverarmor === false) {
                    hero.santeMax += this.value;
                    hero.sante += this.value;
                    hero.recoverarmor = this;
                    hero.recoverarmor.equiped = true;
                    this.content.prepend("E  ");
                    this.btnEquip.innerHTML = "desequiper";
                }
            } else if (Object.getPrototypeOf(this).constructor.name.toLowerCase() == "recovershield") {
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
    }

    unequipItem () {
        if (Object.getPrototypeOf(this).constructor.name.toLowerCase() == "recoverweapon"){
            if(hero.recoverweapon === this && hero.recoverweapon.equiped === true) {
                hero.attaque -= this.value;
                hero.recoverweapon.equiped = false;
                hero.recoverweapon = false;
                this.content.innerHTML = this.description;
                this.btnEquip.innerHTML = "equiper";
            }
        } else if (Object.getPrototypeOf(this).constructor.name.toLowerCase() == "recoverarmor") {
            if (hero.recoverarmor === this && hero.recoverarmor.equiped === true){
                hero.santeMax -= this.value;
                hero.sante -= this.value;
                hero.recoverarmor.equiped = false;
                hero.recoverarmor = false;
                this.content.innerHTML = this.description;
                this.btnEquip.innerHTML = "equiper";
            } 
        } else if (Object.getPrototypeOf(this).constructor.name.toLowerCase() == "recovershield") {
            if (hero.recovershield === this && hero.recovershield.equiped === true){
                hero.santeMax -= this.value;
                hero.sante -= this.value;
                hero.recovershield.equiped = false;
                hero.recovershield = false;
                this.content.innerHTML = this.description;
                this.btnEquip.innerHTML = "equiper";
            }
        } 
    }
        
}
  
class RecoverPotion extends RecoverItem {
  
    constructor(name) {
        super(name);
        this.name              = potionInCurse.name;
        this.effect            = potionInCurse.effect;
        this.value             = potionInCurse.value;
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

class RecoverWeapon extends RecoverItem {
  
    constructor(name) {
        super(name);
        this.name              = weaponInCurse.name
        this.type              = weaponInCurse.type;
        this.value             = weaponInCurse.value;
        this.effect            = weaponInCurse.effect;
        this.valueEffect       = weaponInCurse.valueEffect;
        this.content.innerText = this.description;
        this.equiped           = false;
        return this;
    }

    get description() {
        return this.name + ' : ' + this.value + ' point de dégat';
    }
  
}

class RecoverShield extends RecoverItem {
  
    constructor(name) {
        super(name);
        this.name              = shieldInCurse.name
        this.value             = shieldInCurse.value;
        this.effect            = shieldInCurse.effect;
        this.valueEffect       = shieldInCurse.valueEffect;
        this.content.innerText = this.description;
        this.equiped           = false;
        return this;
    }

    get description() {
        return this.name + ' : + ' + this.value + ' point de vie';
    }
  
}

class RecoverArmor extends RecoverItem {
  
    constructor(name) {
        super(name);
        this.name              = armorInCurse.name;
        this.type              = armorInCurse.type;
        this.value             = armorInCurse.value;
        this.effect            = armorInCurse.effect;
        this.valueEffect       = armorInCurse.valueEffect;
        this.content.innerText = this.description;
        this.equiped           = false; 
        return this;
    }

    get description() {
        return this.name + ' : + ' + this.value + ' point de vie';
    }
  
}

for (let i in JSON.parse(localStorage.getItem("inventory")).potion){
    potionInCurse = JSON.parse(localStorage.getItem("inventory")).potion[i];
    potionInCurse = new RecoverPotion;
    potionInCurse.addInventory();
}

for (let i in JSON.parse(localStorage.getItem("inventory")).weapon){
    weaponInCurse = JSON.parse(localStorage.getItem("inventory")).weapon[i];
    weaponInCurse = new RecoverWeapon;
    weaponInCurse.addInventory();
}

for (let i in JSON.parse(localStorage.getItem("inventory")).shield){
    shieldInCurse = JSON.parse(localStorage.getItem("inventory")).shield[i];
    shieldInCurse = new RecoverShield;
    shieldInCurse.addInventory();
}

for (let i in JSON.parse(localStorage.getItem("inventory")).armor){
    armorInCurse = JSON.parse(localStorage.getItem("inventory")).armor[i];
    armorInCurse = new RecoverArmor;
    armorInCurse.addInventory();
}