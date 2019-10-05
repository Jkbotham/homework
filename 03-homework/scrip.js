var numberEl = document.getElementById("numbers");
var sCharEl = document.getElementById("special");
var lCaseEl = document.getElementById("lowerCase");
var uCaseEl = document.getElementById("upperCase");
var genPw = document.getElementById("gen");


    var i = document.getElementById("cRange"),
        o = document.getElementById("sAmount");

    o.innerHTML = i.value;

    i.addEventListener('input', function (){
        o.innerHTML = i.value;
    });
    

genPw.addEventListener("click", function() {
    var j = i.value;
    function passwordgen(length) {
    var result = "";
    var sChar = "!'(&)*+,-.%/:;<=>?@][$^_`{|#}~";
    var uCase = "QWERTYUIOPASDFGHJKLZXCVBNM";
    var lCase =  uCase.toLowerCase();
    var bers = "1234567890";
    var bothTogether = uCase+lCase;
    var cLength = bothTogether.length;
    var i = document.getElementById("cRange");
    for ( var z = 0; z < length; z++ ) {
        result += bothTogether.charAt(Math.floor(Math.random() * cLength));
    }
    return result;
    }
    console.log(passwordgen(j));
    console.log(j);
});