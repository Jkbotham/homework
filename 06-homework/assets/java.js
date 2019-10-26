
$(document).ready(function () {

        var cityName = "plymouth";
        var searchVar = encodeURI(cityName);
        var weatherURL = "http://api.openweathermap.org/data/2.5/";
        var nowWeather = "weather?q=";
        var hourlyWeather = "forcast/hourly?q=";
        var fiveDayWeather = "forcast?q=";
        var apiKey = "ffb6baedd502c2b85f5529aeaf64b272";
        var proxy = "https://chriscastle.com/proxy/index.php?:proxy:";
        
        // http://app.ticketmaster.com/discovery/v2/events.json?&keyword=Minnesota%20Vikings&apikey=uc6FKMGBBMGcsjNBIjHKvpNkXv2pkFhd&startDateTime=2019-10-23T18:00:00Z&sort=date,asc
        
        // $.ajax({
        //     type: "GET",
        //     url: proxy + weatherURL + nowWeather,
        //     dataType: "json",
        //     data: cityName + "&APPID=" + apiKey,
        //     timeout: 2000,
        //     success: function(response) {
        //         console.log(response);
        
        //     },
        //     error: function(xhr, status, err) {
        //         console.log(xhr, status, err);
        //     }
        // });

        // "http://api.openweathermap.org/data/2.5/" + "weather?q=" + "wayzata" + "&APPID=ffb6baedd502c2b85f5529aeaf64b272"
        var wholeURL = weatherURL + fiveDayWeather + cityName + "&APPID=" + apiKey;
        $.ajax(wholeURL)
            .done(function(responseTwo) {
                console.log(responseTwo);
                console.log("yousuck");
            })
            .fail(function() {
            console.log("you suck");
            });

});

