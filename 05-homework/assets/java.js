
$(document).ready(function () {

    var lengthOfDay = 9
    
    $("#currentDay").text(moment().format('dddd, MMMM Do'));

    for (i = 9; i < lengthOfDay + 9; i++) {
        var hourOne = moment(i, "hh");
        var location = $(".firstColm");


        var divRow = $("<div>");
        $(divRow).attr("class", "row time-block");

        var hHour = $("<h4>");
        $(hHour).attr("class", "hour")
        $(hHour).text(hourOne.format('hha'));

        var textColm = $("<div>");
        $(textColm).attr("class", "col-md-8 txtColm");
        var textArea = $("<textarea>");
        $(textArea).attr("id", "hour" + i); 
        $(textArea).attr("type", "text");
        $(textArea).attr("value", "");         

        if (hourOne.isAfter(moment()) === true) {
            $(textArea).attr("class", "h-100 w-100 future");
        } else if (hourOne.format('h') === moment().format('h')) {
            $(textArea).attr("class", "h-100 w-100 present");
        } else {
            $(textArea).attr("class", "h-100 w-100 past");
        };

        var divBtnCol = $("<div>");
        $(divBtnCol).attr("class", "col-md-2 btnColm");
        var btn = $("<button>");
        $(btn).attr("class", "btn btn-lg h-100 w-100 saveBtn");
        $(btn).data("hour", "#" + hourOne.format("hha"));
        $(btn).attr("type", "button");

        var lock = $("<i>");
        $(lock).attr("class", "fas fa-lock");
        $(btn).append(lock);

        $(divRow).append(hHour);
        $(textColm).append(textArea);
        $(divRow).append(textColm);
        $(divBtnCol).append(btn);
        $(divRow).append(divBtnCol);
        $(location).append(divRow);

    }

    for (i = 9; i < lengthOfDay + 9; i++){
            
        var input = "#hour" + i;
        var value = localStorage.getItem(input)
        $(input).text(value);
    
    }
    $(".saveBtn").on("click",function(){

        for (i = 9; i < lengthOfDay + 9; i++){
            
            var input = "#hour" + i;

            localStorage.setItem(input, $(input).val());
        }

    })

});

