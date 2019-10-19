
$(document).ready(function () {
    
    $(".rowt").empty();
    
    $("#currentDay").text(moment().format('dddd, MMMM Do'));
    var t = 9;

    for (i = 0; i < 9; i++) {
        var hourOne = moment(t, "h");
        var location = $(".rowt");


        var divRow = $("<div>");
        $(divRow).attr("class", "row time-block");

        var hHour = $("<h4>");
        $(hHour).attr("class", "hour")
        $(hHour).text(hourOne.format('hha'));

        var textColm = $("<div>");
        $(textColm).attr("class", "col-md-8 txtColm");
        var textArea = $("<textarea>");
        $(textArea).data("hour", hourOne.format("hha"));

        if (hourOne.isAfter(moment()) === true) {
            $(textArea).attr("class", "h-100 w-100 future");
        } else if (hourOne.isBefore(moment()) === true) {
            $(textArea).attr("class", "h-100 w-100 past");
        } else {
            $(textArea).attr("class", "h-100 w-100 present");
        };

        var divBtnCol = $("<div>");
        $(divBtnCol).attr("class", "col-md-2 btnColm");
        var btn = $("<button>");
        $(btn).attr("class", "btn btn-lg h-100 w-100 saveBtn");
        $(btn).data("hour", hourOne.format("hha"));
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

        t++;
    }

    $(".saveBtn").on("click",function(){
        console.log($(this).data("hour"))
    })
});