var numberEl = document.getElementById("numbers");
var sCharEl = document.getElementById("special");
var lCaseEl = document.getElementById("lowerCase");
var uCaseEl = document.getElementById("upperCase");
var genPw = document.getElementById("gen");
var sent = document.getElementById("sent");


    var i = document.getElementById("cRange"),
        o = document.getElementById("sAmount");

    o.innerHTML = i.value;

    i.addEventListener('input', function (){
        o.innerHTML = i.value;
    });
    

genPw.addEventListener("click", function() {
    var j = i.value;
    var incChar = "";
    function passwordgen(length) {
    var result = "";
    var sChar = "!'(&)*+,-.%/:;<=>?@][$^_`{|#}~";
    var uCase = "QWERTYUIOPASDFGHJKLZXCVBNM";
    var lCase =  uCase.toLowerCase();
    var bers = "1234567890";
    var bothTogether = uCase+lCase;
    var cLength = bothTogether.length;
    var i = document.getElementById("cRange");
    var array = [numberEl.checked, sCharEl.checked, lCaseEl.checked, uCaseEl.checked];
    var trueArray = [bers, sChar, lCase, uCase];

    for ( var k = 0; k < array.length; k++ ) {
        if (array[k] === true){
              incChar += trueArray[k] ;
            };;
            };

    for ( var z = 0; z < length; z++ ) {
        result += incChar.charAt(Math.floor(Math.random() * incChar.length));
    }
    return result;
};
    console.log(incChar, numberEl.checked,sCharEl.checked,lCaseEl.checked,uCaseEl.checked,j,passwordgen(j));
    sent.innerHTML = passwordgen(j);
})

