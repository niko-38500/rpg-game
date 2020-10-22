$("#menu").click(function () {
    $("#menu_tavernier").slideToggle();
});

$("#inventory").hide();

$("#shop").click(function () {
    $("#inventory").slideToggle();
});

let fight = document.querySelector("#fight");

fight.addEventListener("click", function() {
    if(confirm("voulez vous partir combattre ?")){
        fight.setAttribute("href", "../fight_page/fight.html")
    }
});

