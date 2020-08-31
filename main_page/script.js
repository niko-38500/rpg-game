$("#magicien").click(function (){
    localStorage.setItem("classe", "magicien");
});

$("#guerrier").click(function (){
    localStorage.setItem("classe", "guerrier");
});



$("#magicien, #guerrier").click(function () {
    let pseudo = $("#pseudo").val();
    localStorage.setItem("pseudo", pseudo);
});
